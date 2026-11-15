"""Data model for raw, verbatim customer records."""
from __future__ import annotations

import hashlib
import re
from dataclasses import asdict, dataclass, fields
from datetime import datetime, timezone

# Platform code -> label shown in the sheet's "Platform" column.
PLATFORMS: dict[str, str] = {
    "yt": "YouTube",
    "rd": "Reddit",
    "az": "Amazon",
    "fk": "Flipkart",
    "ta": "TripAdvisor",
    "qr": "Quora",
    "bhp": "Team-BHP",
    "ft": "FlyerTalk",
    "tp": "Trustpilot",
    "ms": "MouthShut",
}

KINDS = {"comment", "reply", "post", "review", "answer"}
DATE_PRECISIONS = {"exact", "approx", "unknown"}
_ISO_DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def text_hash(text: str) -> str:
    """SHA-256 of the verbatim text. Stored at capture time, re-checked on every load."""
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


@dataclass(frozen=True)
class RawRecord:
    """One thing one real person wrote, exactly as the platform returned it."""

    rid: str  # "<platform code>:<platform's own id>", unique across the store
    platform: str  # label from PLATFORMS
    kind: str  # one of KINDS
    author: str  # handle or display name, exactly as shown
    date: str  # posting date as YYYY-MM-DD (UTC), or "" when the platform shows none
    date_precision: str  # "exact", "approx" (derived from "3 months ago") or "unknown"
    text: str  # verbatim; never edited after capture
    url: str  # direct permalink to this exact item
    context_title: str = ""  # video / thread / product title
    context_url: str = ""  # parent page
    rating: float | None = None  # star rating, for reviews
    likes: int | None = None
    query: str = ""  # search or seed that surfaced the item
    fetched_at: str = ""  # capture time, ISO-8601 UTC
    sha256: str = ""  # text_hash(text) at capture

    def to_json(self) -> dict:
        return asdict(self)

    @classmethod
    def from_json(cls, data: dict) -> "RawRecord":
        known = {f.name for f in fields(cls)}
        return cls(**{k: v for k, v in data.items() if k in known})


def make_record(
    code: str,
    native_id: str,
    *,
    kind: str,
    author: str,
    date: str,
    text: str,
    url: str,
    date_precision: str = "exact",
    context_title: str = "",
    context_url: str = "",
    rating: float | None = None,
    likes: int | None = None,
    query: str = "",
    fetched_at: str | None = None,
) -> RawRecord:
    """Build a validated record. The text is stored untouched: no strip, no normalisation."""
    if code not in PLATFORMS:
        raise ValueError(f"unknown platform code {code!r}")
    if not native_id:
        raise ValueError("native_id is required")
    if kind not in KINDS:
        raise ValueError(f"unknown kind {kind!r}")
    if date_precision not in DATE_PRECISIONS:
        raise ValueError(f"unknown date_precision {date_precision!r}")
    if date and not _ISO_DATE.match(date):
        raise ValueError(f"date must be YYYY-MM-DD or empty, got {date!r}")
    if not date and date_precision != "unknown":
        raise ValueError("an empty date needs date_precision='unknown'")
    if not isinstance(text, str) or not text.strip():
        raise ValueError("text must be a non-empty string")
    if not url.startswith("https://"):
        raise ValueError(f"url must be an https permalink, got {url!r}")
    return RawRecord(
        rid=f"{code}:{native_id}",
        platform=PLATFORMS[code],
        kind=kind,
        author=author or "",
        date=date,
        date_precision=date_precision,
        text=text,
        url=url,
        context_title=context_title,
        context_url=context_url,
        rating=rating,
        likes=likes,
        query=query,
        fetched_at=fetched_at or datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        sha256=text_hash(text),
    )
