"""The collector is tested against the documented response shape of the YouTube Data API v3.

No network is used: a stub session replays fixture pages.
"""
import pytest

from voc.collectors.youtube_api import YouTubeAPI, YouTubeAPIError, comment_url, thread_to_records
from voc.verify import PERMALINK_PATTERNS

VIDEO = "AAAAAAAAAAA"
TOP_TEXT = "TEST FIXTURE ONLY. we carried packets  because   there was no veg food (typo: restorent)"
REPLY_TEXT = "TEST FIXTURE ONLY. same here, the kids refused the hotel breakfast every single day"


def _comment(comment_id, text, author="@fixture", published="2026-03-09T18:22:41Z", likes=3):
    return {"id": comment_id, "snippet": {"textOriginal": text, "textDisplay": "ignored", "authorDisplayName": author, "publishedAt": published, "likeCount": likes}}


def _thread(comment_id, text, replies=()):
    thread = {"id": comment_id, "snippet": {"topLevelComment": _comment(comment_id, text), "totalReplyCount": len(replies)}}
    if replies:
        thread["replies"] = {"comments": list(replies)}
    return thread


class StubResponse:
    def __init__(self, status, payload):
        self.status_code, self._payload, self.text = status, payload, str(payload)

    def json(self):
        return self._payload


class StubSession:
    def __init__(self, responses):
        self.responses, self.calls = list(responses), []

    def get(self, url, params=None, headers=None, timeout=None):
        self.calls.append({"url": url, "params": dict(params or {}), "headers": dict(headers or {})})
        return self.responses.pop(0)


def test_thread_maps_to_verbatim_records_with_direct_links():
    reply = _comment("UgxTOP0000000000000001.9REPLY001", REPLY_TEXT, author="@replier", published="2026-03-10T01:00:00Z")
    records = thread_to_records(_thread("UgxTOP0000000000000001", TOP_TEXT, [reply]), VIDEO, "Fixture video", "fixture query")
    top, child = records
    assert top.text == TOP_TEXT and child.text == REPLY_TEXT
    assert (top.kind, child.kind) == ("comment", "reply")
    assert top.date == "2026-03-09" and top.date_precision == "exact"
    assert top.author == "@fixture" and top.likes == 3
    assert top.url == "https://www.youtube.com/watch?v=AAAAAAAAAAA&lc=UgxTOP0000000000000001"
    assert child.url == comment_url(VIDEO, "UgxTOP0000000000000001.9REPLY001")
    assert all(PERMALINK_PATTERNS["YouTube"].match(record.url) for record in records)
    assert top.context_title == "Fixture video" and top.query == "fixture query"


def test_empty_or_malformed_comments_are_skipped():
    blank = _thread("UgxBLANK", "   ")
    no_date = {"id": "x", "snippet": {"topLevelComment": {"id": "x", "snippet": {"textOriginal": TOP_TEXT}}}}
    assert thread_to_records(blank, VIDEO, "t") == []
    assert thread_to_records(no_date, VIDEO, "t") == []


def test_pagination_follows_next_page_token():
    pages = [
        StubResponse(200, {"items": [_thread("UgxPAGE1", TOP_TEXT)], "nextPageToken": "TOKEN2"}),
        StubResponse(200, {"items": [_thread("UgxPAGE2", REPLY_TEXT)]}),
    ]
    session = StubSession(pages)
    api = YouTubeAPI(api_key="fixture-key", session=session, pause=0)
    records = list(api.comment_records(VIDEO, "Fixture video", max_pages=5))
    assert [record.rid for record in records] == ["yt:UgxPAGE1", "yt:UgxPAGE2"]
    assert session.calls[0]["params"]["textFormat"] == "plainText"
    assert "pageToken" not in session.calls[0]["params"]
    assert session.calls[1]["params"]["pageToken"] == "TOKEN2"
    assert session.calls[0]["params"]["key"] == "fixture-key"
    assert api.units_used == 2


def test_max_pages_stops_early():
    pages = [StubResponse(200, {"items": [_thread(f"UgxP{n}", TOP_TEXT + str(n))], "nextPageToken": "more"}) for n in range(5)]
    api = YouTubeAPI(api_key="k", session=StubSession(pages), pause=0)
    assert len(list(api.comment_records(VIDEO, max_pages=2))) == 2


def test_videos_with_comments_off_are_skipped_not_fatal():
    error = {"error": {"message": "disabled", "errors": [{"reason": "commentsDisabled"}]}}
    api = YouTubeAPI(api_key="k", session=StubSession([StubResponse(403, error)]), pause=0)
    assert list(api.comment_records(VIDEO)) == []


def test_quota_errors_are_raised():
    error = {"error": {"message": "quota", "errors": [{"reason": "quotaExceeded"}]}}
    api = YouTubeAPI(api_key="k", session=StubSession([StubResponse(403, error)]), pause=0)
    with pytest.raises(YouTubeAPIError) as caught:
        list(api.comment_records(VIDEO))
    assert caught.value.reason == "quotaExceeded"


def test_without_a_key_the_placeholder_header_is_sent():
    session = StubSession([StubResponse(200, {"items": []})])
    api = YouTubeAPI(api_key="", session=session, pause=0)
    list(api.comment_records(VIDEO))
    assert "key" not in session.calls[0]["params"]
    assert session.calls[0]["headers"]["X-Goog-Api-Key"] == "replaced-by-proxy"


def test_search_and_video_meta():
    search = StubResponse(200, {"items": [{"id": {"videoId": "VID00000001"}}, {"id": {"channelId": "skip"}}, {"id": {"videoId": "VID00000002"}}]})
    meta = StubResponse(200, {"items": [{"id": "VID00000001", "snippet": {"title": "T1", "channelTitle": "C1", "publishedAt": "2026-01-02T03:04:05Z"}, "statistics": {"commentCount": "41"}}]})
    session = StubSession([search, meta])
    api = YouTubeAPI(api_key="k", session=session, pause=0)
    assert api.search_videos("fixture query", published_after="2025-11-15T00:00:00Z") == ["VID00000001", "VID00000002"]
    assert session.calls[0]["params"]["publishedAfter"] == "2025-11-15T00:00:00Z"
    assert api.video_meta(["VID00000001"]) == {"VID00000001": {"title": "T1", "channel": "C1", "published": "2026-01-02", "comments": 41}}
    assert api.units_used == 101
