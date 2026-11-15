"""YouTube comments through the official YouTube Data API v3.

Why the API and not the web page: the API returns the comment text as typed,
the exact posting time and a stable comment id. The id gives a direct link
(`watch?v=<video>&lc=<comment>`) that opens the video with that comment pinned
on top, which is how a reader verifies a quote.

Quota: search.list costs 100 units, commentThreads.list and videos.list cost 1.
A free key has 10,000 units a day.

The key is read from YT_API_KEY. Without it the request carries a placeholder
header, for sessions where the network proxy injects the saved key.
"""
from __future__ import annotations

import os
import time
from typing import Iterator

import requests

from ..models import RawRecord, make_record

API_ROOT = "https://youtube.googleapis.com/youtube/v3"
SKIPPABLE_REASONS = {"commentsDisabled", "videoNotFound", "forbidden"}


class YouTubeAPIError(RuntimeError):
    def __init__(self, status: int, reason: str, message: str):
        super().__init__(f"YouTube API {status} {reason}: {message}")
        self.status, self.reason = status, reason


def comment_url(video_id: str, comment_id: str) -> str:
    return f"https://www.youtube.com/watch?v={video_id}&lc={comment_id}"


def comment_to_record(comment: dict, video_id: str, title: str, kind: str, query: str = "") -> RawRecord | None:
    """Map one API comment resource to a record. Returns None for empty or malformed items."""
    snippet = comment.get("snippet") or {}
    text = snippet.get("textOriginal") or snippet.get("textDisplay") or ""
    published = snippet.get("publishedAt") or ""
    comment_id = comment.get("id") or ""
    if not (text.strip() and comment_id and len(published) >= 10):
        return None
    return make_record(
        "yt",
        comment_id,
        kind=kind,
        author=snippet.get("authorDisplayName") or "",
        date=published[:10],
        text=text,
        url=comment_url(video_id, comment_id),
        context_title=title,
        context_url=f"https://www.youtube.com/watch?v={video_id}",
        likes=snippet.get("likeCount"),
        query=query,
    )


def thread_to_records(thread: dict, video_id: str, title: str, query: str = "") -> list[RawRecord]:
    """A comment thread is one top-level comment plus the replies the API chose to embed."""
    records: list[RawRecord] = []
    top = (thread.get("snippet") or {}).get("topLevelComment")
    if top:
        record = comment_to_record(top, video_id, title, "comment", query)
        if record:
            records.append(record)
    for reply in (thread.get("replies") or {}).get("comments", []):
        record = comment_to_record(reply, video_id, title, "reply", query)
        if record:
            records.append(record)
    return records


class YouTubeAPI:
    def __init__(self, api_key: str | None = None, session: requests.Session | None = None, pause: float = 0.1):
        self.api_key = api_key if api_key is not None else os.environ.get("YT_API_KEY", "")
        self.session = session or requests.Session()
        self.pause = pause
        self.units_used = 0

    def _get(self, resource: str, cost: int, **params) -> dict:
        headers = {}
        if self.api_key:
            params["key"] = self.api_key
        else:
            headers["X-Goog-Api-Key"] = "replaced-by-proxy"
        response = self.session.get(f"{API_ROOT}/{resource}", params=params, headers=headers, timeout=30)
        self.units_used += cost
        if response.status_code != 200:
            try:
                error = response.json()["error"]
                reason = (error.get("errors") or [{}])[0].get("reason", "")
                message = error.get("message", "")
            except (ValueError, KeyError, TypeError):
                reason, message = "", response.text[:200]
            raise YouTubeAPIError(response.status_code, reason, message)
        time.sleep(self.pause)
        return response.json()

    def search_videos(
        self,
        query: str,
        *,
        published_after: str | None = None,
        max_results: int = 25,
        region: str = "IN",
        order: str = "relevance",
    ) -> list[str]:
        """Video ids for a search phrase. 100 quota units per call."""
        params = dict(part="id", type="video", q=query, maxResults=min(max_results, 50), regionCode=region, order=order)
        if published_after:
            params["publishedAfter"] = published_after
        data = self._get("search", 100, **params)
        return [item["id"]["videoId"] for item in data.get("items", []) if item.get("id", {}).get("videoId")]

    def video_meta(self, video_ids: list[str]) -> dict[str, dict]:
        """Title, channel, publish date and comment count for up to 50 ids per call."""
        meta: dict[str, dict] = {}
        for start in range(0, len(video_ids), 50):
            chunk = video_ids[start : start + 50]
            data = self._get("videos", 1, part="snippet,statistics", id=",".join(chunk), maxResults=50)
            for item in data.get("items", []):
                snippet, statistics = item.get("snippet", {}), item.get("statistics", {})
                meta[item["id"]] = {
                    "title": snippet.get("title", ""),
                    "channel": snippet.get("channelTitle", ""),
                    "published": (snippet.get("publishedAt") or "")[:10],
                    "comments": int(statistics.get("commentCount", 0) or 0),
                }
        return meta

    def comment_records(
        self,
        video_id: str,
        title: str = "",
        *,
        order: str = "relevance",
        max_pages: int = 3,
        query: str = "",
    ) -> Iterator[RawRecord]:
        """Top-level comments and embedded replies of one video, up to max_pages x 100 threads."""
        page_token = None
        for _ in range(max_pages):
            params = dict(part="snippet,replies", videoId=video_id, maxResults=100, order=order, textFormat="plainText")
            if page_token:
                params["pageToken"] = page_token
            try:
                data = self._get("commentThreads", 1, **params)
            except YouTubeAPIError as error:
                if error.reason in SKIPPABLE_REASONS:
                    return
                raise
            for thread in data.get("items", []):
                yield from thread_to_records(thread, video_id, title, query)
            page_token = data.get("nextPageToken")
            if not page_token:
                return
