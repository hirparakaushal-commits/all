import json

import pytest

from voc.models import RawRecord, make_record, text_hash
from voc.store import IntegrityError, RawStore

TEXT = "TEST FIXTURE ONLY.  two  spaces, a typo (recieve) and a trailing space are all kept "
URL = "https://www.youtube.com/watch?v=AAAAAAAAAAA&lc=UgxFIXTUREstore00000001"


def _record(native_id="UgxFIXTUREstore00000001", text=TEXT):
    return make_record("yt", native_id, kind="comment", author="@fixture", date="2026-05-01", text=text, url=URL)


def test_text_is_stored_untouched():
    record = _record()
    assert record.text == TEXT
    assert record.sha256 == text_hash(TEXT)
    assert record.rid == "yt:UgxFIXTUREstore00000001"
    assert record.platform == "YouTube"


@pytest.mark.parametrize(
    "overrides",
    [
        {"kind": "tweet"},
        {"date": "14/08/2026"},
        {"text": "   "},
        {"url": "http://www.youtube.com/watch?v=AAAAAAAAAAA"},
        {"date": "", "date_precision": "exact"},
        {"date_precision": "roughly"},
    ],
)
def test_bad_records_are_rejected(overrides):
    fields = dict(kind="comment", author="@fixture", date="2026-05-01", text=TEXT, url=URL)
    fields.update(overrides)
    with pytest.raises(ValueError):
        make_record("yt", "x1", **fields)


def test_unknown_platform_is_rejected():
    with pytest.raises(ValueError):
        make_record("zz", "x1", kind="comment", author="a", date="2026-05-01", text=TEXT, url=URL)


def test_store_round_trip_keeps_every_character(tmp_path):
    store = RawStore(tmp_path)
    tricky = "TEST FIXTURE ONLY. ગુજરાતી + हिंदी + emoji 😋 + \"quotes\" + back\\slash + tab\there + line\nbreak"
    assert store.add([_record(), _record("UgxFIXTUREstore00000002", tricky)]) == (2, 0)
    loaded = store.load()
    assert loaded["yt:UgxFIXTUREstore00000001"].text == TEXT
    assert loaded["yt:UgxFIXTUREstore00000002"].text == tricky
    assert isinstance(loaded["yt:UgxFIXTUREstore00000001"], RawRecord)


def test_store_skips_records_it_already_has(tmp_path):
    store = RawStore(tmp_path)
    store.add([_record()])
    assert store.add([_record(), _record()]) == (0, 2)
    assert len(store.load()) == 1


def test_edited_quote_is_detected_on_load(tmp_path):
    store = RawStore(tmp_path)
    store.add([_record()])
    path = tmp_path / "yt.jsonl"
    data = json.loads(path.read_text(encoding="utf-8"))
    data["text"] = data["text"].replace("recieve", "receive")  # a "helpful" spelling fix
    path.write_text(json.dumps(data, ensure_ascii=False) + "\n", encoding="utf-8")
    with pytest.raises(IntegrityError):
        store.load()
