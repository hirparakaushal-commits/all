from datetime import date

import pytest

from voc.models import make_record
from voc.selection import ELLIPSIS, SelectionError, load_selections, parse_line, quote_for, strip_markers
from voc.verify import PERMALINK_PATTERNS, insight_problem, verify

from conftest import FIXTURE_LONG

TODAY = date(2026, 11, 15)
YT = "yt:UgxFIXTURE0000000000001"
RD = "rd:fixt001"
AZ = "az:R1FIXTURE0001"
INSIGHT = "Food uncertainty turns a holiday into a logistics problem."


def test_parse_plain_hero_and_excerpt_lines():
    plain = parse_line(f"{YT}|S02|T02|{INSIGHT}", "f.sel:1")
    assert (plain.rid, plain.segment, plain.theme, plain.insight, plain.hero) == (YT, "S02", "T02", INSIGHT, False)
    assert parse_line(f"*{YT}|S02|T02|{INSIGHT}").hero is True
    cut = parse_line(f"{YT}|S02|T02|{INSIGHT}|from=Second part;to=every night.")
    assert (cut.anchor_from, cut.anchor_to) == ("Second part", "every night.")
    assert parse_line("# a comment") is None and parse_line("   ") is None


@pytest.mark.parametrize("line", ["only|three|fields", f"{YT}|S02|T02|", f"{YT}|S02|T02|{INSIGHT}|start=x", f"{YT}|S02|T02|{INSIGHT}|"])
def test_malformed_lines_are_rejected(line):
    with pytest.raises(SelectionError):
        parse_line(line, "f.sel:1")


def test_whole_quote_is_returned_unchanged(records):
    selection = parse_line(f"{YT}|S02|T02|{INSIGHT}")
    assert quote_for(selection, records[YT]) == FIXTURE_LONG


def test_excerpt_is_one_verbatim_passage_with_markers(records):
    selection = parse_line(f"{YT}|S02|T02|{INSIGHT}|from=Typo kept;to=40 min away!!")
    quote = quote_for(selection, records[YT])
    assert quote == f"{ELLIPSIS} Typo kept: restorent was 40 min away!! {ELLIPSIS}"
    assert strip_markers(quote) in FIXTURE_LONG


def test_excerpt_from_the_start_has_no_leading_marker(records):
    selection = parse_line(f"{YT}|S02|T02|{INSIGHT}|to=bread and fruit.")
    quote = quote_for(selection, records[YT])
    assert quote.startswith("TEST FIXTURE ONLY.") and quote.endswith(f" {ELLIPSIS}")


@pytest.mark.parametrize("anchors", ["from=words that are not there", "from=we", "from=every night.;to=Typo kept"])
def test_bad_anchors_are_rejected(records, anchors):
    selection = parse_line(f"{YT}|S02|T02|{INSIGHT}|{anchors}", "f.sel:1")
    with pytest.raises(SelectionError):
        quote_for(selection, records[YT])


def test_aliases_resolve_to_record_ids(tmp_path):
    (tmp_path / "batch01.sel").write_text(f"# header\n7|S02|T02|{INSIGHT}\n{RD}|S10|T22|{INSIGHT}\n", encoding="utf-8")
    loaded = load_selections(tmp_path, {"7": YT})
    assert [selection.rid for selection in loaded] == [YT, RD]
    assert loaded[0].source == "batch01.sel:2"


def test_clean_selection_passes(records, taxonomy):
    selections = [
        parse_line(f"*{YT}|S02|T02|{INSIGHT}"),
        parse_line(f"{RD}|S10|T22|{INSIGHT}"),
        parse_line(f"{AZ}|S12|T10|{INSIGHT}"),
    ]
    report = verify(records, selections, taxonomy, TODAY)
    assert report.ok, report.render()
    assert report.stats["rows"] == 3
    assert report.stats["last 12 months"] == 2 and report.stats["older than 12 months"] == 1
    assert report.stats["by platform"] == {"YouTube": 1, "Reddit": 1, "Amazon": 1}


def _errors(records, taxonomy, *lines):
    return verify(records, [parse_line(line, f"t.sel:{n}") for n, line in enumerate(lines, 1)], taxonomy, TODAY).errors


def test_unknown_record_and_duplicate_selection_fail(records, taxonomy):
    errors = _errors(records, taxonomy, f"yt:missing|S02|T02|{INSIGHT}", f"{YT}|S02|T02|{INSIGHT}", f"{YT}|S02|T02|{INSIGHT}")
    assert any("not in the raw store" in error for error in errors)
    assert any("selected twice" in error for error in errors)


def test_unknown_tags_fail(records, taxonomy):
    errors = _errors(records, taxonomy, f"{YT}|S99|T99|{INSIGHT}")
    assert any("unknown segment" in error for error in errors) and any("unknown theme" in error for error in errors)


@pytest.mark.parametrize(
    "insight, expected",
    [
        ("No full stop at the end", "does not end like a sentence"),
        ("First sentence here. Second sentence here.", "more than one sentence"),
        (" ".join(["word"] * 50) + ".", "longer than"),
        (INSIGHT, None),
        ("They pay Rs. 2,000 a plate and resent it?", "more than one sentence"),
    ],
)
def test_insight_must_be_one_sentence(insight, expected):
    problem = insight_problem(insight)
    assert (problem is None) if expected is None else (expected in problem)


def test_short_excerpt_fails_the_depth_rule(records, taxonomy):
    errors = _errors(records, taxonomy, f"{YT}|S02|T02|{INSIGHT}|from=Typo kept;to=40 min away!!")
    assert any("depth rule" in error for error in errors)


def test_thread_level_link_is_not_a_permalink(records, taxonomy):
    loose = make_record(
        "yt", "UgxFIXTURE0000000000009", kind="comment", author="@fixture", date="2026-08-14",
        text=FIXTURE_LONG + " (second fixture)", url="https://www.youtube.com/watch?v=AAAAAAAAAAA",
    )
    errors = verify({loose.rid: loose}, [parse_line(f"{loose.rid}|S02|T02|{INSIGHT}")], taxonomy, TODAY).errors
    assert any("not a direct YouTube permalink" in error for error in errors)


def test_missing_name_missing_date_and_future_date_fail(taxonomy):
    url = "https://www.youtube.com/watch?v=AAAAAAAAAAA&lc="
    nameless = make_record("yt", "n1", kind="comment", author="", date="2026-08-14", text=FIXTURE_LONG, url=url + "n1")
    dateless = make_record("yt", "n2", kind="comment", author="@f", date="", date_precision="unknown", text=FIXTURE_LONG + " b", url=url + "n2")
    future = make_record("yt", "n3", kind="comment", author="@f", date="2027-01-01", text=FIXTURE_LONG + " c", url=url + "n3")
    store = {record.rid: record for record in (nameless, dateless, future)}
    errors = verify(store, [parse_line(f"{rid}|S02|T02|{INSIGHT}") for rid in store], taxonomy, TODAY).errors
    assert any("no customer name" in error for error in errors)
    assert any("no posting date" in error for error in errors)
    assert any("dated in the future" in error for error in errors)


def test_same_words_from_two_records_fail(records, taxonomy):
    twin = make_record(
        "yt", "UgxFIXTURE0000000000002", kind="comment", author="@copycat", date="2026-08-15",
        text=FIXTURE_LONG.upper(), url="https://www.youtube.com/watch?v=AAAAAAAAAAA&lc=UgxFIXTURE0000000000002",
    )
    store = dict(records, **{twin.rid: twin})
    errors = verify(store, [parse_line(f"{YT}|S02|T02|{INSIGHT}"), parse_line(f"{twin.rid}|S02|T02|{INSIGHT}")], taxonomy, TODAY).errors
    assert any("duplicate quote" in error for error in errors)


@pytest.mark.parametrize(
    "platform, url, ok",
    [
        ("YouTube", "https://www.youtube.com/watch?v=dQw4w9WgXcQ&lc=UgxAbC-_123.9xYz", True),
        ("YouTube", "https://www.youtube.com/watch?v=dQw4w9WgXcQ", False),
        ("Reddit", "https://www.reddit.com/r/india/comments/1abcde/some_title/k9xyz12/", True),
        ("Reddit", "https://www.reddit.com/r/india/comments/1abcde/some_title/", True),
        ("Reddit", "https://www.reddit.com/r/india/", False),
        ("Amazon", "https://www.amazon.in/gp/customer-reviews/R2ABCDEFGHIJK", True),
        ("Amazon", "https://www.amazon.in/dp/B07XVL3T2H", False),
        ("Trustpilot", "https://www.trustpilot.com/reviews/64a1b2c3d4e5f60718293a4b", True),
        ("Trustpilot", "https://www.trustpilot.com/review/example.com", False),
        ("Quora", "https://www.quora.com/Some-question-here/answer/Some-Person-12", True),
        ("Quora", "https://www.quora.com/Some-question-here", False),
        ("TripAdvisor", "https://www.tripadvisor.in/ShowTopic-g1-i2-k3-Title-Place.html#12345", True),
        ("TripAdvisor", "https://www.tripadvisor.com/ShowUserReviews-g1-d2-r987654321-Name-City.html", True),
        ("TripAdvisor", "https://www.tripadvisor.in/Restaurant_Review-g1-d2-Reviews-Name.html", False),
        ("Team-BHP", "https://www.team-bhp.com/forum/route-travel-queries/285558-title.html#post5678901", True),
        ("Team-BHP", "https://www.team-bhp.com/forum/route-travel-queries/285558-title.html", False),
    ],
)
def test_permalink_patterns(platform, url, ok):
    assert bool(PERMALINK_PATTERNS[platform].match(url)) is ok
