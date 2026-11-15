"""Shared fixtures.

Every text below is a made-up TEST FIXTURE written for these unit tests. None of
it is customer data, and none of it may ever be loaded into data/raw or shown in
the sheet. The fixtures exist to prove the pipeline copies text without changing
a single character.
"""
import json
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from voc.models import make_record  # noqa: E402

FIXTURE_LONG = (
    "TEST FIXTURE ONLY. we went to a made up place for 6 days and i could not find anything veg, "
    "so we ate bread and fruit.  Typo kept: restorent was 40 min away!! "
    "Second part of the fixture: next time we will carry packets because the kids were hungry every night."
)
FIXTURE_HINDI = "TEST FIXTURE ONLY. हमने यात्रा में खाना साथ रखा क्योंकि वहाँ शाकाहारी भोजन नहीं मिला, बच्चों को बहुत दिक्कत हुई थी।"
FIXTURE_FORMULA = "=TEST FIXTURE ONLY. we carried our own food because the hotel had no kettle and dinner was expensive"


@pytest.fixture
def taxonomy():
    return json.loads((ROOT / "taxonomy.json").read_text(encoding="utf-8"))


@pytest.fixture
def records():
    made = [
        make_record(
            "yt", "UgxFIXTURE0000000000001", kind="comment", author="@fixture_one", date="2026-08-14",
            text=FIXTURE_LONG, url="https://www.youtube.com/watch?v=AAAAAAAAAAA&lc=UgxFIXTURE0000000000001",
            context_title="Fixture video", context_url="https://www.youtube.com/watch?v=AAAAAAAAAAA", likes=12,
        ),
        make_record(
            "rd", "fixt001", kind="comment", author="u/fixture_two", date="2024-01-02",
            text=FIXTURE_HINDI, url="https://www.reddit.com/r/fixture/comments/abc123/some_thread/fixt001/",
            context_title="Fixture thread",
        ),
        make_record(
            "az", "R1FIXTURE0001", kind="review", author="Fixture Three", date="2026-03-01",
            text=FIXTURE_FORMULA, url="https://www.amazon.in/gp/customer-reviews/R1FIXTURE0001", rating=2.0,
            context_title="Fixture product",
        ),
    ]
    return {record.rid: record for record in made}
