"""Checks that every row of the sheet obeys the brief's strict rules.

Rule 1 (zero AI-written quotes): the quote must be the stored text, or one
contiguous passage of it. Rule 2 (mandatory source links): the link must be a
direct permalink to that exact comment, review or post. Rule 3 (depth over
volume): no one-liners, no duplicates. Rule 4 (AI only for tagging): segment and
theme come from the taxonomy and the insight is a single sentence.
"""
from __future__ import annotations

import re
from dataclasses import dataclass, field
from datetime import date, timedelta

from .models import RawRecord
from .prefilter import MIN_CHARS, normalize_for_dupes
from .selection import Selection, SelectionError, quote_for, strip_markers

EXCEL_CELL_LIMIT = 32767
MAX_INSIGHT_WORDS = 45
RECENT_DAYS = 365

# A direct permalink to one item, per platform. Thread or product pages are not enough.
PERMALINK_PATTERNS: dict[str, re.Pattern[str]] = {
    "YouTube": re.compile(r"^https://www\.youtube\.com/watch\?v=[\w-]{11}&lc=[\w.\-]+$"),
    "Reddit": re.compile(r"^https://www\.reddit\.com/r/\w+/comments/[a-z0-9]+/[^/\s]*/(?:[a-z0-9]+/)?$"),
    "Amazon": re.compile(r"^https://www\.amazon\.(?:in|com)/gp/customer-reviews/R[A-Z0-9]{8,}/?$"),
    "Flipkart": re.compile(r"^https://www\.flipkart\.com/\S+$"),
    "TripAdvisor": re.compile(
        r"^https://www\.tripadvisor\.(?:in|com)/(?:ShowTopic-\S+\.html(?:#\d+)?|ShowUserReviews-\S*-r\d+-\S*\.html)$"
    ),
    "Quora": re.compile(r"^https://www\.quora\.com/[^/\s]+/answer/[^/\s]+$"),
    "Team-BHP": re.compile(r"^https://www\.team-bhp\.com/forum/\S+#post\d+$"),
    "FlyerTalk": re.compile(r"^https://www\.flyertalk\.com/forum/\S+#post\d+$"),
    "Trustpilot": re.compile(r"^https://www\.trustpilot\.com/reviews/[0-9a-f]{24}$"),
    "MouthShut": re.compile(r"^https://www\.mouthshut\.com/review/\S+$"),
}

_SENTENCE_BREAK = re.compile(r"[.!?]\s+\S")


@dataclass
class VerifyReport:
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    stats: dict[str, object] = field(default_factory=dict)

    @property
    def ok(self) -> bool:
        return not self.errors

    def render(self) -> str:
        lines = [f"errors: {len(self.errors)}   warnings: {len(self.warnings)}"]
        lines += [f"  ERROR  {message}" for message in self.errors]
        lines += [f"  warn   {message}" for message in self.warnings]
        lines += [f"  {key}: {value}" for key, value in self.stats.items()]
        return "\n".join(lines)


def insight_problem(insight: str) -> str | None:
    """Why an insight is not 'one sentence', or None when it is."""
    if "\n" in insight:
        return "insight spans more than one line"
    if not insight.endswith((".", "!", "?")):
        return "insight does not end like a sentence"
    if _SENTENCE_BREAK.search(insight[:-1]):
        return "insight has more than one sentence"
    if len(insight.split()) > MAX_INSIGHT_WORDS:
        return f"insight is longer than {MAX_INSIGHT_WORDS} words"
    return None


def verify(
    records: dict[str, RawRecord],
    selections: list[Selection],
    taxonomy: dict,
    today: date,
) -> VerifyReport:
    report = VerifyReport()
    segments, themes = taxonomy["segments"], taxonomy["themes"]
    seen_rids: set[str] = set()
    seen_texts: dict[str, str] = {}
    recent = older = approx_dates = excerpts = 0
    per_platform: dict[str, int] = {}
    cutoff = today - timedelta(days=RECENT_DAYS)

    for selection in selections:
        where = selection.source or selection.rid
        if selection.rid in seen_rids:
            report.errors.append(f"{where}: {selection.rid} is selected twice")
            continue
        seen_rids.add(selection.rid)

        record = records.get(selection.rid)
        if record is None:
            report.errors.append(f"{where}: {selection.rid} is not in the raw store")
            continue
        if selection.segment not in segments:
            report.errors.append(f"{where}: unknown segment code {selection.segment!r}")
        if selection.theme not in themes:
            report.errors.append(f"{where}: unknown theme code {selection.theme!r}")
        problem = insight_problem(selection.insight)
        if problem:
            report.errors.append(f"{where}: {problem}")

        try:
            quote = quote_for(selection, record)
        except SelectionError as exc:
            report.errors.append(str(exc))
            continue
        words = strip_markers(quote)
        if words not in record.text:
            report.errors.append(f"{where}: quote is not a verbatim passage of {selection.rid}")
        if len(words.strip()) < MIN_CHARS:
            report.errors.append(f"{where}: quote is under {MIN_CHARS} characters (depth rule)")
        if len(quote) > EXCEL_CELL_LIMIT:
            report.errors.append(f"{where}: quote exceeds the Excel cell limit; add from/to anchors")
        if quote != record.text:
            excerpts += 1

        pattern = PERMALINK_PATTERNS.get(record.platform)
        if pattern is None or not pattern.match(record.url):
            report.errors.append(f"{where}: {record.url!r} is not a direct {record.platform} permalink")
        if not record.author.strip():
            report.errors.append(f"{where}: {selection.rid} has no customer name")
        if not record.date:
            report.errors.append(f"{where}: {selection.rid} has no posting date")
        else:
            posted = date.fromisoformat(record.date)
            if posted > today:
                report.errors.append(f"{where}: {selection.rid} is dated in the future ({record.date})")
            elif posted >= cutoff:
                recent += 1
            else:
                older += 1
            if record.date_precision != "exact":
                approx_dates += 1

        key = normalize_for_dupes(words)
        if key in seen_texts:
            report.errors.append(f"{where}: same words as {seen_texts[key]} (duplicate quote)")
        else:
            seen_texts[key] = selection.rid
        per_platform[record.platform] = per_platform.get(record.platform, 0) + 1

    total = len(seen_rids)
    report.stats = {
        "rows": total,
        "last 12 months": recent,
        "older than 12 months": older,
        "approximate dates": approx_dates,
        "excerpts of longer posts": excerpts,
        "by platform": dict(sorted(per_platform.items(), key=lambda item: -item[1])),
    }
    if total and older > recent:
        report.warnings.append("more than half of the quotes are older than 12 months")
    return report
