"""Builds the Voice-of-Customer workbook (.xlsx) and its .csv twin."""
from __future__ import annotations

import csv
from collections import Counter
from dataclasses import dataclass
from datetime import date, timedelta
from pathlib import Path

from openpyxl import Workbook
from openpyxl.cell.cell import ILLEGAL_CHARACTERS_RE
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter

from .models import RawRecord
from .prefilter import script_of
from .selection import Selection, quote_for
from .verify import RECENT_DAYS

# The nine columns the brief asks for, in its order.
MAIN_HEADERS = [
    "No",
    "Date",
    "Customer Name",
    "Customer Quotes (their exact words)",
    "Customer Segment (persona)",
    "Insight",
    "Topic Theme",
    "Platform",
    "Source Link",
]
MAIN_WIDTHS = [6, 14, 24, 90, 30, 60, 30, 13, 48]
HEROES_PER_THEME = 3

_HEADER_FONT = Font(bold=True, color="FFFFFF")
_HEADER_FILL = PatternFill("solid", fgColor="1F2937")
_WRAP_TOP = Alignment(wrap_text=True, vertical="top")
_TOP = Alignment(vertical="top")
_LINK_FONT = Font(color="0563C1", underline="single")


@dataclass(frozen=True)
class Row:
    no: int
    date: str
    name: str
    quote: str
    segment: str
    insight: str
    theme: str
    platform: str
    url: str
    record: RawRecord
    selection: Selection


def display_date(record: RawRecord) -> str:
    """Exact dates as YYYY-MM-DD; dates derived from '3 months ago' as month plus a flag."""
    if record.date_precision == "exact":
        return record.date
    return f"{record.date[:7]} (approx.)" if record.date else ""


def excel_safe(text: str) -> str:
    """Drop the control characters the .xlsx format cannot store. Nothing else changes."""
    return ILLEGAL_CHARACTERS_RE.sub("", text)


def build_rows(records: dict[str, RawRecord], selections: list[Selection], taxonomy: dict) -> list[Row]:
    """Join selections to raw records. Ordered by segment, then theme, then newest first."""
    segments, themes = taxonomy["segments"], taxonomy["themes"]

    def sort_key(selection: Selection):
        record = records[selection.rid]
        newest_first = -date.fromisoformat(record.date).toordinal() if record.date else 0
        return (selection.segment, selection.theme, newest_first, selection.rid)

    rows: list[Row] = []
    for number, selection in enumerate(sorted(selections, key=sort_key), 1):
        record = records[selection.rid]
        rows.append(
            Row(
                no=number,
                date=display_date(record),
                name=record.author,
                quote=quote_for(selection, record),
                segment=segments[selection.segment]["label"],
                insight=selection.insight,
                theme=themes[selection.theme]["label"],
                platform=record.platform,
                url=record.url,
                record=record,
                selection=selection,
            )
        )
    return rows


def _set_text(cell, value: str, *, wrap: bool = False) -> None:
    """Write a string as a string. A quote that starts with '=' must not become a formula."""
    cell.value = excel_safe(value)
    cell.data_type = "s"
    cell.alignment = _WRAP_TOP if wrap else _TOP


def _set_link(cell, url: str) -> None:
    _set_text(cell, url)
    cell.hyperlink = url
    cell.font = _LINK_FONT


def _header(sheet, headers: list[str], widths: list[int]) -> None:
    for column, (title, width) in enumerate(zip(headers, widths), 1):
        cell = sheet.cell(row=1, column=column, value=title)
        cell.font, cell.fill, cell.alignment = _HEADER_FONT, _HEADER_FILL, _WRAP_TOP
        sheet.column_dimensions[get_column_letter(column)].width = width
    sheet.freeze_panes = "A2"


def _main_sheet(sheet, rows: list[Row]) -> None:
    _header(sheet, MAIN_HEADERS, MAIN_WIDTHS)
    for index, row in enumerate(rows, 2):
        number = sheet.cell(row=index, column=1, value=row.no)
        number.alignment = _TOP
        _set_text(sheet.cell(row=index, column=2), row.date)
        _set_text(sheet.cell(row=index, column=3), row.name)
        _set_text(sheet.cell(row=index, column=4), row.quote, wrap=True)
        _set_text(sheet.cell(row=index, column=5), row.segment, wrap=True)
        _set_text(sheet.cell(row=index, column=6), row.insight, wrap=True)
        _set_text(sheet.cell(row=index, column=7), row.theme, wrap=True)
        _set_text(sheet.cell(row=index, column=8), row.platform)
        _set_link(sheet.cell(row=index, column=9), row.url)
    sheet.auto_filter.ref = f"A1:{get_column_letter(len(MAIN_HEADERS))}{max(len(rows) + 1, 2)}"


def _heroes_sheet(sheet, rows: list[Row], taxonomy: dict) -> None:
    """'Enter the conversation in their head': the strongest quotes for each worry."""
    headers = ["Topic Theme", "What is already on their mind", "No", "Their exact words", "Customer Name", "Platform", "Source Link"]
    _header(sheet, headers, [30, 46, 6, 90, 24, 13, 48])
    theme_counts = Counter(row.theme for row in rows)
    definitions = {theme["label"]: theme["definition"] for theme in taxonomy["themes"].values()}
    line = 2
    for theme, _count in theme_counts.most_common():
        of_theme = [row for row in rows if row.theme == theme]
        picked = [row for row in of_theme if row.selection.hero][:HEROES_PER_THEME]
        for row in picked:
            _set_text(sheet.cell(row=line, column=1), theme, wrap=True)
            _set_text(sheet.cell(row=line, column=2), definitions.get(theme, ""), wrap=True)
            sheet.cell(row=line, column=3, value=row.no).alignment = _TOP
            _set_text(sheet.cell(row=line, column=4), row.quote, wrap=True)
            _set_text(sheet.cell(row=line, column=5), row.name)
            _set_text(sheet.cell(row=line, column=6), row.platform)
            _set_link(sheet.cell(row=line, column=7), row.url)
            line += 1


def _count_block(sheet, top: int, title: str, counts: list[tuple[str, int]], total: int) -> int:
    sheet.cell(row=top, column=1, value=title).font = Font(bold=True)
    sheet.cell(row=top, column=2, value="Quotes").font = Font(bold=True)
    sheet.cell(row=top, column=3, value="Share").font = Font(bold=True)
    for offset, (label, count) in enumerate(counts, 1):
        _set_text(sheet.cell(row=top + offset, column=1), label)
        sheet.cell(row=top + offset, column=2, value=count)
        share = sheet.cell(row=top + offset, column=3, value=(count / total) if total else 0)
        share.number_format = "0.0%"
    return top + len(counts) + 2


def _summary_sheet(sheet, rows: list[Row], today: date) -> None:
    sheet.column_dimensions["A"].width = 48
    sheet.column_dimensions["B"].width = 10
    sheet.column_dimensions["C"].width = 10
    total = len(rows)
    cutoff = today - timedelta(days=RECENT_DAYS)
    recent = sum(1 for row in rows if row.record.date and date.fromisoformat(row.record.date) >= cutoff)
    top = 1
    top = _count_block(sheet, top, "Customer segment", Counter(row.segment for row in rows).most_common(), total)
    top = _count_block(sheet, top, "Topic theme", Counter(row.theme for row in rows).most_common(), total)
    top = _count_block(sheet, top, "Platform", Counter(row.platform for row in rows).most_common(), total)
    top = _count_block(
        sheet, top, "Recency", [("Last 12 months", recent), ("Older than 12 months", total - recent)], total
    )
    _count_block(sheet, top, "Script", Counter(script_of(row.quote) for row in rows).most_common(), total)


def _details_sheet(sheet, rows: list[Row]) -> None:
    headers = ["No", "Record ID", "Type", "Posted under (video / thread / product)", "Parent link", "Star rating", "Likes", "Script", "Date precision", "Excerpt of a longer post"]
    _header(sheet, headers, [6, 34, 10, 60, 48, 10, 8, 12, 14, 14])
    for index, row in enumerate(rows, 2):
        record = row.record
        sheet.cell(row=index, column=1, value=row.no)
        _set_text(sheet.cell(row=index, column=2), record.rid)
        _set_text(sheet.cell(row=index, column=3), record.kind)
        _set_text(sheet.cell(row=index, column=4), record.context_title, wrap=True)
        if record.context_url:
            _set_link(sheet.cell(row=index, column=5), record.context_url)
        if record.rating is not None:
            sheet.cell(row=index, column=6, value=record.rating)
        if record.likes is not None:
            sheet.cell(row=index, column=7, value=record.likes)
        _set_text(sheet.cell(row=index, column=8), script_of(row.quote))
        _set_text(sheet.cell(row=index, column=9), record.date_precision)
        _set_text(sheet.cell(row=index, column=10), "yes" if row.quote != record.text else "no")


def _taxonomy_sheet(sheet, taxonomy: dict) -> None:
    _header(sheet, ["Kind", "Code", "Label", "Definition"], [10, 8, 44, 100])
    line = 2
    for kind, key in (("Segment", "segments"), ("Theme", "themes")):
        for code, entry in taxonomy[key].items():
            for column, value in enumerate((kind, code, entry["label"], entry["definition"]), 1):
                _set_text(sheet.cell(row=line, column=column), value, wrap=column == 4)
            line += 1


def _readme_sheet(sheet, readme_lines: list[str]) -> None:
    sheet.column_dimensions["A"].width = 130
    for line_no, text in enumerate(readme_lines, 1):
        _set_text(sheet.cell(row=line_no, column=1), text, wrap=True)
    if readme_lines:
        sheet.cell(row=1, column=1).font = Font(bold=True, size=14)


def write_workbook(rows: list[Row], taxonomy: dict, readme_lines: list[str], path: Path | str, today: date) -> Path:
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    workbook = Workbook()
    main = workbook.active
    main.title = "VoC Quotes"
    _main_sheet(main, rows)
    _heroes_sheet(workbook.create_sheet("In Their Head"), rows, taxonomy)
    _summary_sheet(workbook.create_sheet("Summary"), rows, today)
    _details_sheet(workbook.create_sheet("Quote Details"), rows)
    _taxonomy_sheet(workbook.create_sheet("Taxonomy"), taxonomy)
    _readme_sheet(workbook.create_sheet("Read Me"), readme_lines)
    workbook.save(path)
    return path


def write_csv(rows: list[Row], path: Path | str) -> Path:
    """The main tab as UTF-8 CSV (with BOM, so Excel shows Hindi and Gujarati correctly)."""
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(MAIN_HEADERS)
        for row in rows:
            writer.writerow([row.no, row.date, row.name, row.quote, row.segment, row.insight, row.theme, row.platform, row.url])
    return path
