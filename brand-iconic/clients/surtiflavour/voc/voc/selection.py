"""Curation files: which raw records go into the sheet, and how they are tagged.

A selection line never contains a quote. It names a record and carries the three
AI-written tags the brief allows (segment, theme, insight):

    <rid>|<segment code>|<theme code>|<one-sentence insight>
    *<rid>|S02|T01|Insight text.                       <- leading * marks a "hero" quote
    <rid>|S07|T19|Insight text.|from=first words;to=last words

The optional from/to anchors cut one contiguous passage out of a long post. The
passage is located inside the stored text and copied from it, so an excerpt is
still the customer's exact words. Lines starting with # are comments.
"""
from __future__ import annotations

from dataclasses import dataclass, replace
from pathlib import Path

from .models import RawRecord

ELLIPSIS = "[…]"  # marks where an excerpt was cut; the only characters ever added to a quote


class SelectionError(ValueError):
    pass


@dataclass(frozen=True)
class Selection:
    rid: str
    segment: str
    theme: str
    insight: str
    hero: bool = False
    anchor_from: str = ""
    anchor_to: str = ""
    source: str = ""  # file:line, for error messages


def parse_line(line: str, source: str = "") -> Selection | None:
    stripped = line.strip()
    if not stripped or stripped.startswith("#"):
        return None
    parts = stripped.split("|")
    if len(parts) not in (4, 5):
        raise SelectionError(f"{source}: expected 4 or 5 '|' fields, got {len(parts)}")
    rid, segment, theme, insight = (part.strip() for part in parts[:4])
    hero = rid.startswith("*")
    rid = rid.lstrip("*").strip()
    anchor_from = anchor_to = ""
    if len(parts) == 5:
        for piece in parts[4].split(";"):
            key, _, value = piece.partition("=")
            key, value = key.strip(), value.strip()
            if key == "from":
                anchor_from = value
            elif key == "to":
                anchor_to = value
            elif key:
                raise SelectionError(f"{source}: unknown excerpt key {key!r}")
        if not (anchor_from or anchor_to):
            raise SelectionError(f"{source}: empty excerpt field")
    if not (rid and segment and theme and insight):
        raise SelectionError(f"{source}: rid, segment, theme and insight are all required")
    return Selection(rid, segment, theme, insight, hero, anchor_from, anchor_to, source)


def load_selections(folder: Path | str, aliases: dict[str, str] | None = None) -> list[Selection]:
    """Read every *.sel file in the folder, in name order. Review aliases become record ids."""
    aliases = aliases or {}
    selections: list[Selection] = []
    for path in sorted(Path(folder).glob("*.sel")):
        with path.open(encoding="utf-8") as handle:
            for line_no, line in enumerate(handle, 1):
                parsed = parse_line(line, f"{path.name}:{line_no}")
                if parsed is None:
                    continue
                if parsed.rid in aliases:
                    parsed = replace(parsed, rid=aliases[parsed.rid])
                selections.append(parsed)
    return selections


def _find_once(text: str, anchor: str, source: str) -> int:
    first = text.find(anchor)
    if first < 0:
        raise SelectionError(f"{source}: anchor {anchor!r} is not in the stored text")
    if text.find(anchor, first + 1) >= 0:
        raise SelectionError(f"{source}: anchor {anchor!r} appears more than once; use a longer anchor")
    return first


def quote_for(selection: Selection, record: RawRecord) -> str:
    """The exact text to show: the whole record, or one contiguous passage cut from it."""
    text = record.text
    if not (selection.anchor_from or selection.anchor_to):
        return text
    start = _find_once(text, selection.anchor_from, selection.source) if selection.anchor_from else 0
    if selection.anchor_to:
        end = _find_once(text, selection.anchor_to, selection.source) + len(selection.anchor_to)
    else:
        end = len(text)
    if end <= start:
        raise SelectionError(f"{selection.source}: 'to' anchor ends before the 'from' anchor starts")
    passage = text[start:end]
    prefix = f"{ELLIPSIS} " if text[:start].strip() else ""
    suffix = f" {ELLIPSIS}" if text[end:].strip() else ""
    return f"{prefix}{passage}{suffix}"


def strip_markers(quote: str) -> str:
    """Remove the excerpt markers again, leaving only the customer's words."""
    if quote.startswith(f"{ELLIPSIS} "):
        quote = quote[len(ELLIPSIS) + 1 :]
    if quote.endswith(f" {ELLIPSIS}"):
        quote = quote[: -(len(ELLIPSIS) + 1)]
    return quote
