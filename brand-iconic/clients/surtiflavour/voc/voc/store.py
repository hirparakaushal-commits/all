"""Append-only JSONL store for raw records, one file per platform."""
from __future__ import annotations

import json
from pathlib import Path
from typing import Iterable

from .models import PLATFORMS, RawRecord, text_hash


class IntegrityError(Exception):
    """A stored quote no longer matches the hash taken when it was captured."""


class RawStore:
    def __init__(self, root: Path | str):
        self.root = Path(root)
        self.root.mkdir(parents=True, exist_ok=True)

    def path_for(self, rid: str) -> Path:
        code = rid.split(":", 1)[0]
        if code not in PLATFORMS:
            raise ValueError(f"unknown platform code in rid {rid!r}")
        return self.root / f"{code}.jsonl"

    def load(self) -> dict[str, RawRecord]:
        """Read every record and re-check its hash. Raises IntegrityError on any edited text."""
        records: dict[str, RawRecord] = {}
        for path in sorted(self.root.glob("*.jsonl")):
            with path.open(encoding="utf-8") as handle:
                for line_no, line in enumerate(handle, 1):
                    if not line.strip():
                        continue
                    record = RawRecord.from_json(json.loads(line))
                    if text_hash(record.text) != record.sha256:
                        raise IntegrityError(
                            f"{path.name}:{line_no} {record.rid}: text does not match its capture hash"
                        )
                    records.setdefault(record.rid, record)
        return records

    def add(self, new_records: Iterable[RawRecord]) -> tuple[int, int]:
        """Append records that are not stored yet. Returns (added, skipped_as_duplicate)."""
        existing = set(self.load())
        added = skipped = 0
        handles: dict[Path, object] = {}
        try:
            for record in new_records:
                if record.rid in existing:
                    skipped += 1
                    continue
                path = self.path_for(record.rid)
                handle = handles.get(path)
                if handle is None:
                    handle = handles[path] = path.open("a", encoding="utf-8")
                handle.write(json.dumps(record.to_json(), ensure_ascii=False) + "\n")
                existing.add(record.rid)
                added += 1
        finally:
            for handle in handles.values():
                handle.close()
        return added, skipped
