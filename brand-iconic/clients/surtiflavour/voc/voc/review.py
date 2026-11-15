"""Review batches: compact listings of ranked candidates for the curation pass.

Record ids are long ("yt:UgxK3...AaABAg"), so each candidate gets a short numeric
alias. A selection line may name a record by alias or by full id.
"""
from __future__ import annotations

import json
from pathlib import Path

from .models import RawRecord


def load_aliases(path: Path | str) -> dict[str, str]:
    """alias -> rid. Missing file means no aliases yet."""
    path = Path(path)
    if not path.exists():
        return {}
    return json.loads(path.read_text(encoding="utf-8"))


def assign_aliases(records: list[RawRecord], aliases: dict[str, str]) -> dict[str, str]:
    """Give every record without an alias the next free number. Existing aliases never change."""
    by_rid = {rid: alias for alias, rid in aliases.items()}
    next_number = max((int(alias) for alias in aliases), default=0) + 1
    for record in records:
        if record.rid not in by_rid:
            aliases[str(next_number)] = record.rid
            by_rid[record.rid] = str(next_number)
            next_number += 1
    return aliases


def save_aliases(aliases: dict[str, str], path: Path | str) -> None:
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(aliases, ensure_ascii=False, indent=0), encoding="utf-8")


def render_batch(
    records: list[RawRecord],
    aliases: dict[str, str],
    *,
    start: int = 0,
    size: int = 40,
    max_chars: int = 700,
) -> str:
    """One page of candidates. Long texts are cut for reading only; the store keeps the whole text."""
    by_rid = {rid: alias for alias, rid in aliases.items()}
    lines: list[str] = []
    for record in records[start : start + size]:
        text = " ".join(record.text.split())
        shown = text if len(text) <= max_chars else f"{text[:max_chars]} …(+{len(text) - max_chars} chars)"
        stars = f" | {record.rating:g}★" if record.rating is not None else ""
        lines.append(
            f"[{by_rid.get(record.rid, record.rid)}] {record.platform} | {record.date or '?'}{stars} | "
            f"{record.author[:24]} | on: {record.context_title[:70]}\n{shown}"
        )
    return "\n\n".join(lines)
