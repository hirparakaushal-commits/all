"""Heuristics that rank raw records for human-style review.

Nothing here selects a quote for the sheet. The filters only drop obvious noise
(spam, adverts, one-line praise) and order what is left, so that the curation
pass reads the richest material first. "Depth over volume" is enforced by the
curation pass and by verify.py, not by this score.
"""
from __future__ import annotations

import re
import unicodedata

from .models import RawRecord

MIN_CHARS = 60  # shorter than this cannot explain "why" or "what happened"

# Latin-script terms are matched as whole words; Devanagari / Gujarati terms as substrings.
FOOD_TERMS = [
    "veg", "vegetarian", "vegetarians", "vegan", "jain", "satvik", "sattvik", "swaminarayan",
    "no onion", "no garlic", "pure veg", "shakahari", "food", "khana", "khaana", "khane",
    "bhojan", "meal", "meals", "restaurant", "restaurants", "breakfast", "lunch", "dinner",
    "eat", "eating", "ate", "hungry", "bhookh", "bhukh", "thepla", "theplas", "khakhra",
    "khakra", "maggi", "noodles", "ready to eat", "ready-to-eat", "rte", "mtr", "haldiram",
    "haldirams", "gits", "khichdi", "khichadi", "dal", "daal", "roti", "chapati", "paratha",
    "rice", "chawal", "sabzi", "sabji", "curry", "paneer", "poha", "upma", "pickle", "achar",
    "achaar", "kettle", "rice cooker", "electric cooker", "hot water", "microwave", "tiffin",
    "snacks", "namkeen", "chai", "freeze dried", "freeze-dried", "instant food", "packet",
    "packets", "preservative", "preservatives",
    "खाना", "भोजन", "शाकाहारी", "वेज", "जैन", "थेपला", "खाखरा", "मैगी", "रोटी", "दाल", "चावल",
    "ખાવા", "ભોજન", "શાકાહારી", "જૈન", "થેપલા", "ખાખરા", "જમવા",
]

TRAVEL_TERMS = [
    "trip", "travel", "travelling", "traveling", "travelled", "traveled", "tour", "tours",
    "abroad", "foreign", "international", "flight", "airport", "customs", "immigration",
    "hotel", "visa", "vacation", "holiday", "honeymoon", "europe", "usa", "america", "canada",
    "australia", "dubai", "singapore", "thailand", "bangkok", "phuket", "bali", "vietnam",
    "japan", "china", "korea", "malaysia", "maldives", "switzerland", "paris", "london",
    "turkey", "baku", "azerbaijan", "africa", "kenya", "yatra", "trek", "kedarnath",
    "char dham", "chardham", "train", "hostel", "videsh", "pardes", "farva",
    "विदेश", "यात्रा", "ટ્રિપ", "પ્રવાસ", "યાત્રા", "વિદેશ",
]

FIRST_PERSON_TERMS = [
    "i", "i'm", "im", "i've", "ive", "we", "we're", "my", "our", "me", "us", "myself",
    "mera", "meri", "mere", "hum", "humne", "hamne", "maine", "mujhe", "hume", "humein",
    "ame", "amne", "mane", "mara", "mari", "amara", "hu",
    "मैं", "हम", "हमने", "मैंने", "मुझे", "हमें", "અમે", "મને", "મારા", "હું",
]

SITUATION_TERMS = [
    "because", "since", "had to", "couldn't", "could not", "ended up", "last year",
    "last month", "last week", "when we", "when i", "during", "problem", "problems", "issue",
    "difficult", "struggle", "struggled", "survived", "managed", "carried", "packed", "took",
    "bought", "ordered", "paid", "cost", "expensive", "wasted", "hours", "days", "worried",
    "scared", "afraid", "fear", "tension", "regret", "disappointed", "frustrated", "starving",
    "kyunki", "isliye", "lekin", "magar", "pareshani", "dikkat", "mushkil", "takleef",
    "क्योंकि", "लेकिन", "दिक्कत", "परेशानी", "मुश्किल", "પણ", "તકલીફ", "મુશ્કેલી",
]

_GENERIC_PRAISE = re.compile(
    r"\b(nice|great|good|awesome|amazing|superb|wonderful|lovely|beautiful|excellent|helpful|"
    r"informative|useful)\s+(video|vlog|content|information|info|review|post|share|sharing|work)\b"
    r"|\bthank(s| you)\b|\bkeep it up\b|\blove from\b|\bfirst (comment|view)\b|\bplease reply\b",
    re.IGNORECASE,
)
_PROMO = re.compile(
    r"https?://|www\.|\+?\d[\d\s\-]{8,}\d|\b(whats\s?app|telegram|contact us|call us|dm us|dm me|"
    r"book now|subscribe to my|check my channel|visit our|our company|we provide|we offer|"
    r"promo code|discount code|coupon)\b",
    re.IGNORECASE,
)
_WORD = re.compile(r"[a-z']+")
_LETTERS = re.compile(r"[^\W\d_]", re.UNICODE)


def _latin_words(text: str) -> set[str]:
    return set(_WORD.findall(text.lower()))


def count_terms(text: str, terms: list[str]) -> int:
    """How many distinct terms from the list appear in the text."""
    lowered = text.lower()
    words = _latin_words(text)
    hits = 0
    for term in terms:
        if term.isascii():
            if " " in term or "-" in term:
                if re.search(r"(?<![a-z])" + re.escape(term) + r"(?![a-z])", lowered):
                    hits += 1
            elif term in words:
                hits += 1
        elif term in text:
            hits += 1
    return hits


def normalize_for_dupes(text: str) -> str:
    """Key for near-duplicate detection: case, spacing and punctuation are ignored."""
    folded = unicodedata.normalize("NFKC", text).lower()
    return " ".join("".join(ch if ch.isalnum() else " " for ch in folded).split())


def script_of(text: str) -> str:
    """Rough script label, for the details tab: Latin, Devanagari, Gujarati or Mixed."""
    counts = {"Latin": 0, "Devanagari": 0, "Gujarati": 0}
    for ch in text:
        code = ord(ch)
        if 0x0900 <= code <= 0x097F:
            counts["Devanagari"] += 1
        elif 0x0A80 <= code <= 0x0AFF:
            counts["Gujarati"] += 1
        elif ch.isascii() and ch.isalpha():
            counts["Latin"] += 1
    total = sum(counts.values())
    if not total:
        return "Other"
    top, top_count = max(counts.items(), key=lambda item: item[1])
    return top if top_count / total >= 0.8 else "Mixed"


def noise_reason(text: str) -> str | None:
    """Why a record is not worth reviewing, or None when it should be reviewed."""
    stripped = text.strip()
    if len(stripped) < MIN_CHARS:
        return "too short to explain why or what happened"
    if len(_LETTERS.findall(stripped)) < 0.5 * len(stripped.replace(" ", "")):
        return "mostly emoji, digits or symbols"
    if _PROMO.search(stripped):
        return "link, phone number or promotion"
    has_substance = count_terms(stripped, FIRST_PERSON_TERMS) and count_terms(stripped, SITUATION_TERMS)
    if len(stripped) < 140 and _GENERIC_PRAISE.search(stripped) and not has_substance:
        return "generic praise aimed at the creator"
    return None


def depth_score(text: str) -> int:
    """Higher means more likely to hold a real situation in the customer's own words."""
    length = len(text.strip())
    score = 0
    score += 1 if length >= 120 else 0
    score += 1 if length >= 250 else 0
    score += 1 if length >= 500 else 0
    score += 2 if count_terms(text, FIRST_PERSON_TERMS) else 0
    score += min(3, count_terms(text, SITUATION_TERMS))
    score += min(2, count_terms(text, FOOD_TERMS))
    score += min(2, count_terms(text, TRAVEL_TERMS))
    score += 1 if re.search(r"\d", text) else 0
    score += 1 if "?" in text else 0
    return score


def is_on_topic(text: str) -> bool:
    """Food must be mentioned; travel context is scored but not required (product reviews)."""
    return count_terms(text, FOOD_TERMS) > 0


def rank_candidates(records: list[RawRecord], *, require_topic: bool = True) -> tuple[list[RawRecord], dict[str, int]]:
    """Drop noise and duplicates, then order by depth score. Returns (ranked, drop_counts)."""
    dropped: dict[str, int] = {}
    seen: set[str] = set()
    kept: list[tuple[int, RawRecord]] = []
    for record in records:
        reason = noise_reason(record.text)
        if reason is None and require_topic and not is_on_topic(record.text):
            reason = "no food term"
        if reason is None:
            key = normalize_for_dupes(record.text)
            if key in seen:
                reason = "duplicate text"
            else:
                seen.add(key)
        if reason is not None:
            dropped[reason] = dropped.get(reason, 0) + 1
            continue
        kept.append((depth_score(record.text), record))
    kept.sort(key=lambda pair: (-pair[0], pair[1].rid))
    return [record for _, record in kept], dropped
