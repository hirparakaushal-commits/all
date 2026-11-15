from voc.models import make_record
from voc.prefilter import (
    count_terms,
    depth_score,
    is_on_topic,
    noise_reason,
    normalize_for_dupes,
    rank_candidates,
    script_of,
    FOOD_TERMS,
)

RICH = (
    "TEST FIXTURE ONLY. Last year we went abroad for 8 days and I struggled because there was no veg food near "
    "the hotel, so we had to carry packets and it cost us 2 hours every evening."
)


def _record(native_id, text):
    return make_record(
        "yt", native_id, kind="comment", author="@fixture", date="2026-05-01", text=text,
        url=f"https://www.youtube.com/watch?v=AAAAAAAAAAA&lc={native_id}",
    )


def test_short_text_is_noise():
    assert noise_reason("TEST FIXTURE veg food was bad") == "too short to explain why or what happened"


def test_generic_praise_is_noise():
    text = "TEST FIXTURE ONLY. Very nice video sir, thank you so much for sharing this food vlog with us"
    assert noise_reason(text) == "generic praise aimed at the creator"


def test_promotion_is_noise():
    text = "TEST FIXTURE ONLY. We provide Jain food tours to every country, contact us on whatsapp for the best price today"
    assert noise_reason(text) == "link, phone number or promotion"


def test_emoji_wall_is_noise():
    assert noise_reason("😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋") is not None


def test_rich_first_person_story_is_kept():
    assert noise_reason(RICH) is None
    assert is_on_topic(RICH)


def test_praise_with_a_real_situation_is_kept():
    text = "TEST FIXTURE ONLY. Nice video. I struggled a lot last year because we had no kettle in the hotel room"
    assert noise_reason(text) is None


def test_whole_word_matching():
    assert count_terms("the vegetable market", ["veg"]) == 0
    assert count_terms("pure veg only", ["veg", "pure veg"]) == 2
    assert count_terms("हमने खाना साथ रखा", FOOD_TERMS) >= 1
    assert count_terms("અમે થેપલા લઈ ગયા", FOOD_TERMS) >= 1


def test_depth_score_orders_rich_above_thin():
    thin = "TEST FIXTURE ONLY. The food in that place is not good at all and nobody should go there ever"
    assert depth_score(RICH) > depth_score(thin)


def test_dupe_key_ignores_case_spacing_and_punctuation():
    assert normalize_for_dupes("Veg  food,   NOT found!!") == normalize_for_dupes("veg food not found")


def test_script_detection():
    assert script_of("plain english words") == "Latin"
    assert script_of("हमने खाना साथ रखा") == "Devanagari"
    assert script_of("અમે થેપલા લઈ ગયા") == "Gujarati"
    assert script_of("abroad farva javana hoy ત્યારે ખાવાનું શું") == "Mixed"


def test_rank_drops_noise_duplicates_and_off_topic():
    off_topic = "TEST FIXTURE ONLY. I struggled because the visa took three weeks and the flight was delayed for hours"
    records = [
        _record("a1", RICH),
        _record("a2", RICH.upper()),
        _record("a3", "TEST FIXTURE short"),
        _record("a4", off_topic),
    ]
    ranked, dropped = rank_candidates(records)
    assert [record.rid for record in ranked] == ["yt:a1"]
    assert dropped == {"duplicate text": 1, "too short to explain why or what happened": 1, "no food term": 1}
    kept_any_topic, _ = rank_candidates(records, require_topic=False)
    assert {record.rid for record in kept_any_topic} == {"yt:a1", "yt:a4"}
