import csv
from datetime import date

from openpyxl import load_workbook

from voc.build_sheet import MAIN_HEADERS, build_rows, display_date, excel_safe, write_csv, write_workbook
from voc.models import make_record
from voc.selection import parse_line

from conftest import FIXTURE_FORMULA, FIXTURE_HINDI, FIXTURE_LONG

TODAY = date(2026, 11, 15)
INSIGHT = "Food uncertainty turns a holiday into a logistics problem."
YT, RD, AZ = "yt:UgxFIXTURE0000000000001", "rd:fixt001", "az:R1FIXTURE0001"


def _selections():
    return [
        parse_line(f"{RD}|S10|T22|{INSIGHT}"),
        parse_line(f"*{YT}|S02|T02|{INSIGHT}"),
        parse_line(f"{AZ}|S02|T10|{INSIGHT}"),
    ]


def test_headers_match_the_brief_exactly():
    assert MAIN_HEADERS == [
        "No", "Date", "Customer Name", "Customer Quotes (their exact words)", "Customer Segment (persona)",
        "Insight", "Topic Theme", "Platform", "Source Link",
    ]


def test_rows_are_ordered_and_numbered(records, taxonomy):
    rows = build_rows(records, _selections(), taxonomy)
    assert [row.no for row in rows] == [1, 2, 3]
    assert [row.record.rid for row in rows] == [YT, AZ, RD]  # S02/T02, S02/T10, S10/T22
    assert rows[0].segment == "Family vacationer abroad (veg)"
    assert rows[0].theme == "Veg food scarcity at destination"


def test_quotes_reach_the_workbook_character_for_character(records, taxonomy, tmp_path):
    rows = build_rows(records, _selections(), taxonomy)
    path = write_workbook(rows, taxonomy, ["Title", "line two"], tmp_path / "out.xlsx", TODAY)
    workbook = load_workbook(path)
    assert workbook.sheetnames == ["VoC Quotes", "In Their Head", "Summary", "Quote Details", "Taxonomy", "Read Me"]
    sheet = workbook["VoC Quotes"]
    assert [cell.value for cell in sheet[1]] == MAIN_HEADERS
    by_link = {row[8].value: row for row in sheet.iter_rows(min_row=2)}
    assert by_link[records[YT].url][3].value == FIXTURE_LONG
    assert by_link[records[RD].url][3].value == FIXTURE_HINDI
    assert by_link[records[YT].url][2].value == "@fixture_one"
    assert by_link[records[YT].url][1].value == "2026-08-14"
    assert by_link[records[YT].url][8].hyperlink.target == records[YT].url
    assert sheet.auto_filter.ref == "A1:I4"
    assert sheet.freeze_panes == "A2"


def test_quote_starting_with_equals_stays_text(records, taxonomy, tmp_path):
    rows = build_rows(records, _selections(), taxonomy)
    path = write_workbook(rows, taxonomy, [], tmp_path / "out.xlsx", TODAY)
    sheet = load_workbook(path)["VoC Quotes"]
    cell = next(row[3] for row in sheet.iter_rows(min_row=2) if row[8].value == records[AZ].url)
    assert cell.value == FIXTURE_FORMULA
    assert cell.data_type == "s"


def test_hero_tab_lists_only_starred_quotes(records, taxonomy, tmp_path):
    rows = build_rows(records, _selections(), taxonomy)
    path = write_workbook(rows, taxonomy, [], tmp_path / "out.xlsx", TODAY)
    heroes = load_workbook(path)["In Their Head"]
    body = list(heroes.iter_rows(min_row=2, values_only=True))
    assert len(body) == 1
    assert body[0][0] == "Veg food scarcity at destination" and body[0][3] == FIXTURE_LONG


def test_summary_counts_add_up(records, taxonomy, tmp_path):
    rows = build_rows(records, _selections(), taxonomy)
    path = write_workbook(rows, taxonomy, [], tmp_path / "out.xlsx", TODAY)
    values = {row[0]: row[1] for row in load_workbook(path)["Summary"].iter_rows(values_only=True) if row[0]}
    assert values["Family vacationer abroad (veg)"] == 2
    assert values["Last 12 months"] == 2 and values["Older than 12 months"] == 1
    assert values["YouTube"] == 1 and values["Reddit"] == 1 and values["Amazon"] == 1


def test_csv_matches_the_main_tab(records, taxonomy, tmp_path):
    rows = build_rows(records, _selections(), taxonomy)
    path = write_csv(rows, tmp_path / "out.csv")
    assert path.read_bytes().startswith(b"\xef\xbb\xbf")
    with path.open(encoding="utf-8-sig", newline="") as handle:
        table = list(csv.reader(handle))
    assert table[0] == MAIN_HEADERS
    assert len(table) == 4
    assert {line[3] for line in table[1:]} == {FIXTURE_LONG, FIXTURE_HINDI, FIXTURE_FORMULA}


def test_approximate_dates_are_flagged():
    record = make_record(
        "yt", "a1", kind="comment", author="@f", date="2026-08-01", date_precision="approx", text=FIXTURE_LONG,
        url="https://www.youtube.com/watch?v=AAAAAAAAAAA&lc=a1",
    )
    assert display_date(record) == "2026-08 (approx.)"


def test_only_control_characters_are_removed_for_excel():
    assert excel_safe("kept\x0bkept\n\ttabs and newlines stay") == "keptkept\n\ttabs and newlines stay"
