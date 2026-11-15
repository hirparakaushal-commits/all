"""Command line for the VoC pipeline.

    python -m voc.cli stats
    python -m voc.cli collect-youtube --query "veg food in vietnam for indians" --videos 8
    python -m voc.cli collect-youtube --video VIDEO_ID --video VIDEO_ID
    python -m voc.cli review --start 0 --size 40
    python -m voc.cli verify
    python -m voc.cli build
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from datetime import date, datetime, timezone
from pathlib import Path

from .build_sheet import build_rows, write_csv, write_workbook
from .prefilter import rank_candidates
from .review import assign_aliases, load_aliases, render_batch, save_aliases
from .selection import load_selections
from .store import RawStore
from .verify import VerifyReport, verify

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "data" / "raw"
CURATED_DIR = ROOT / "data" / "curated"
ALIASES = CURATED_DIR / "aliases.json"
OUTPUT_DIR = ROOT / "output"
SHEET_NAME = "Surtiflavour_VoC_Raw_Quotes"

RULES = [
    "Rule 1. Zero AI-written quotes. Every quote is copied by code from the text the platform returned. '[…]' marks where a long post was cut; nothing else is added or changed.",
    "Rule 2. Every row links to the exact comment, review or post, not to a page that merely contains it.",
    "Rule 3. Depth over volume. One-line praise, vague complaints, adverts and duplicates are excluded.",
    "Rule 4. AI wrote only three columns: Customer Segment, Topic Theme and Insight.",
]


def load_taxonomy() -> dict:
    return json.loads((ROOT / "taxonomy.json").read_text(encoding="utf-8"))


def readme_lines(report: VerifyReport, today: date, notes: list[str]) -> list[str]:
    stats = report.stats
    platforms = ", ".join(f"{name} {count}" for name, count in stats.get("by platform", {}).items())
    return [
        "Surtiflavour: Raw Voice of the Customer (VoC) extraction",
        f"Built on {today.isoformat()}. Rows: {stats.get('rows', 0)}. "
        f"Posted in the last 12 months: {stats.get('last 12 months', 0)}. Older: {stats.get('older than 12 months', 0)}.",
        f"Rows by platform: {platforms or 'none'}.",
        "",
        "How to read the tabs",
        "VoC Quotes: the research sheet. Use the header filters to slice by segment, theme or platform.",
        "In Their Head: for each worry, the quotes that best show what the customer is already thinking before any message reaches them.",
        "Summary: counts by segment, theme, platform, recency and script.",
        "Quote Details: where each quote was posted (video, thread or product), star rating, likes, and whether it is an excerpt.",
        "Taxonomy: definitions of every segment and theme tag.",
        "",
        "Rules this sheet follows",
        *RULES,
        "",
        "How to verify a quote",
        "Open the Source Link. YouTube links open the video with that comment pinned at the top of the comments. "
        "Reddit, review and forum links open the item itself.",
        f"Dates: {stats.get('approximate dates', 0)} rows carry an approximate date because the platform shows only "
        "relative time (for example '3 months ago'). All other dates are the platform's own timestamp (UTC).",
        f"Excerpts: {stats.get('excerpts of longer posts', 0)} rows show one unbroken passage from a longer post.",
        "",
        "Limits and gaps",
        *notes,
    ]


def cmd_stats(_args) -> int:
    records = RawStore(RAW_DIR).load()
    by_platform = Counter(record.platform for record in records.values())
    print(f"raw records: {len(records)}")
    for platform, count in by_platform.most_common():
        dates = sorted(r.date for r in records.values() if r.platform == platform and r.date)
        span = f"{dates[0]} .. {dates[-1]}" if dates else "no dates"
        print(f"  {platform:12} {count:6}   {span}")
    ranked, dropped = rank_candidates(list(records.values()))
    print(f"review candidates after noise filter: {len(ranked)}")
    for reason, count in sorted(dropped.items(), key=lambda item: -item[1]):
        print(f"  dropped {count:6}  {reason}")
    selected = load_selections(CURATED_DIR, load_aliases(ALIASES))
    print(f"selected for the sheet: {len(selected)}")
    return 0


def cmd_review(args) -> int:
    records = RawStore(RAW_DIR).load()
    pool = [r for r in records.values() if not args.platform or r.platform.lower() == args.platform.lower()]
    ranked, _ = rank_candidates(pool, require_topic=not args.any_topic)
    aliases = load_aliases(ALIASES)
    chosen = {selection.rid for selection in load_selections(CURATED_DIR, aliases)}
    remaining = [record for record in ranked if record.rid not in chosen]
    aliases = assign_aliases(remaining, aliases)
    save_aliases(aliases, ALIASES)
    print(f"# {len(remaining)} candidates not yet selected; showing {args.start}..{args.start + args.size}")
    print(render_batch(remaining, aliases, start=args.start, size=args.size, max_chars=args.max_chars))
    return 0


def _verified():
    records = RawStore(RAW_DIR).load()
    selections = load_selections(CURATED_DIR, load_aliases(ALIASES))
    taxonomy = load_taxonomy()
    today = datetime.now(timezone.utc).date()
    return records, selections, taxonomy, today, verify(records, selections, taxonomy, today)


def cmd_verify(_args) -> int:
    report = _verified()[-1]
    print(report.render())
    return 0 if report.ok else 1


def cmd_build(_args) -> int:
    records, selections, taxonomy, today, report = _verified()
    print(report.render())
    if not report.ok:
        print("not building: fix the errors above first", file=sys.stderr)
        return 1
    notes_path = ROOT / "coverage_notes.txt"
    notes = notes_path.read_text(encoding="utf-8").splitlines() if notes_path.exists() else []
    rows = build_rows(records, selections, taxonomy)
    workbook = write_workbook(rows, taxonomy, readme_lines(report, today, notes), OUTPUT_DIR / f"{SHEET_NAME}.xlsx", today)
    table = write_csv(rows, OUTPUT_DIR / f"{SHEET_NAME}.csv")
    print(f"wrote {workbook} and {table} ({len(rows)} rows)")
    return 0


def cmd_collect_youtube(args) -> int:
    from .collectors.youtube_api import YouTubeAPI

    api = YouTubeAPI()
    store = RawStore(RAW_DIR)
    video_ids = list(args.video or [])
    for query in args.query or []:
        video_ids += api.search_videos(query, published_after=args.published_after, max_results=args.videos)
    video_ids = list(dict.fromkeys(video_ids))
    meta = api.video_meta(video_ids)
    total_added = 0
    for video_id in video_ids:
        info = meta.get(video_id, {})
        records = list(api.comment_records(video_id, info.get("title", ""), max_pages=args.pages, order=args.order))
        added, skipped = store.add(records)
        total_added += added
        print(f"{video_id} {info.get('title', '')[:60]!r}: +{added} new, {skipped} already stored")
    print(f"added {total_added} records; quota units used: {api.units_used}")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="voc", description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    commands = parser.add_subparsers(dest="command", required=True)

    commands.add_parser("stats", help="counts of raw, candidate and selected records").set_defaults(run=cmd_stats)

    review = commands.add_parser("review", help="print a page of ranked candidates")
    review.add_argument("--start", type=int, default=0)
    review.add_argument("--size", type=int, default=40)
    review.add_argument("--max-chars", type=int, default=700)
    review.add_argument("--platform", default="")
    review.add_argument("--any-topic", action="store_true", help="keep records without a food term")
    review.set_defaults(run=cmd_review)

    commands.add_parser("verify", help="check every selected row against the strict rules").set_defaults(run=cmd_verify)
    commands.add_parser("build", help="verify, then write the .xlsx and .csv").set_defaults(run=cmd_build)

    youtube = commands.add_parser("collect-youtube", help="collect comments through the YouTube Data API")
    youtube.add_argument("--query", action="append", help="search phrase; repeatable (100 quota units each)")
    youtube.add_argument("--video", action="append", help="video id; repeatable")
    youtube.add_argument("--videos", type=int, default=10, help="videos per search phrase")
    youtube.add_argument("--pages", type=int, default=3, help="comment pages per video, 100 threads each")
    youtube.add_argument("--order", choices=["relevance", "time"], default="relevance")
    youtube.add_argument("--published-after", default=None, help="RFC 3339 time, e.g. 2025-11-15T00:00:00Z")
    youtube.set_defaults(run=cmd_collect_youtube)

    args = parser.parse_args(argv)
    return args.run(args)


if __name__ == "__main__":
    raise SystemExit(main())
