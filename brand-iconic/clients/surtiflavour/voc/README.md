# Surtiflavour: Raw Voice of the Customer (VoC) extraction

Goal: 1,000 raw, unfiltered customer quotes about eating Indian vegetarian and Jain food away from home, with the emotions, frustrations, workarounds, buying triggers, daily language, fears and desires behind them. Each quote carries a direct link to the place it was posted.

Audience for the research: Surtiflavour (freeze-dried, ready-to-eat Indian food, "Har Safar Ka Sathi"). The store-floor customer is a business owner or senior corporate employee (Gupta, Jain, Agarwal, Mehta, Patel and similar families) buying for business tours, family vacations and friends trips abroad.

## Status (2026-11-15)

**No quotes have been collected yet. The sheet does not exist yet.**

The research session could not reach any source site. Every request to Reddit, YouTube, Amazon, Quora, TripAdvisor, Team-BHP, MouthShut, Trustpilot, Flipkart and Google Trends was refused by the session's network policy (`CONNECT tunnel failed, response 403`). Three requests to add those sites to the environment were rejected by the environments service. The page-fetch tool is under the same block and limits quotes to 125 characters. The search tool returns summaries, not verbatim text with author, date and permalink, and it does not search Reddit. The vidIQ connector (YouTube comments) had 0 credits until 2026-11-17.

Because the brief forbids any quote that is not a verbatim copy with a working link, nothing was written into the sheet from summaries or memory.

What exists is the pipeline that will produce the sheet as soon as the sources are reachable. It is tested (see "Tests").

## The four strict rules, and how the pipeline enforces them

| Rule from the brief | Enforcement |
| --- | --- |
| 1. Zero AI-written quotes | Collectors store the text exactly as the platform returned it, with a SHA-256 hash. The sheet builder copies the text out of the store. Curation files name records by id and cannot contain a quote. Loading the store fails if any stored text no longer matches its hash. |
| 2. Mandatory source links | Every record carries a direct permalink to that exact comment, review or post. `verify` rejects thread-level or product-level links. |
| 3. Depth over volume | `prefilter` removes one-line praise, adverts, spam and duplicates before review. `verify` rejects quotes under 60 characters and repeated wording. |
| 4. AI for tagging only | The only AI-written columns are Customer Segment, Topic Theme and Insight. Segment and theme must come from `taxonomy.json`; the insight must be a single sentence. |

## Output

`output/Surtiflavour_VoC_Raw_Quotes.xlsx` (and a `.csv` copy of the first tab):

| Tab | Content |
| --- | --- |
| VoC Quotes | No, Date, Customer Name, Customer Quotes (their exact words), Customer Segment (persona), Insight, Topic Theme, Platform, Source Link |
| In Their Head | For each worry, the quotes that best show what the customer is already thinking before any message reaches them |
| Summary | Counts by segment, theme, platform, recency and script |
| Quote Details | Video, thread or product the quote was posted under; star rating; likes; excerpt flag |
| Taxonomy | Definitions of every segment and theme tag |
| Read Me | Method, rules, how to verify a quote, limits and gaps |

## How it works

```
collect  ->  data/raw/<platform>.jsonl      verbatim records, append-only, hashed
review   ->  ranked candidates on screen    noise and duplicates removed
select   ->  data/curated/*.sel             record id | segment | theme | insight
verify   ->  pass / fail report             the four rules, as code
build    ->  output/*.xlsx, output/*.csv
```

Commands (run from this folder):

```bash
python -m voc.cli collect-youtube --query "veg food in vietnam for indians" --videos 8
python -m voc.cli stats
python -m voc.cli review --start 0 --size 40
python -m voc.cli verify
python -m voc.cli build
```

A selection line names a record and gives its three tags. It never contains the quote:

```
1532|S02|T01|One-sentence insight about the psychological driver.
*1533|S04|T03|A leading star marks a quote for the "In Their Head" tab.
1534|S07|T19|Insight.|from=first words of the passage;to=last words of the passage
```

The optional `from`/`to` anchors cut one unbroken passage out of a long post. The passage is located in the stored text and copied from it. `[…]` marks the cut.

## Sources

| Platform | Collector | Access needed |
| --- | --- | --- |
| YouTube comments | `voc/collectors/youtube_api.py` (YouTube Data API v3: exact dates, comment permalinks) | `www.googleapis.com` plus an API key in `YT_API_KEY` |
| Reddit, Amazon, TripAdvisor, Quora, Team-BHP, Trustpilot, MouthShut, Flipkart | To be written and tested against live pages once the hosts are reachable | The hosts listed below |
| X, Facebook groups, Instagram, BuzzSumo, AnswerThePublic | Not collectable: these need a logged-in account or a paid plan | None available |

Hosts to allow for the session: `www.reddit.com`, `old.reddit.com`, `arctic-shift.photon-reddit.com`, `api.pullpush.io`, `www.youtube.com`, `www.amazon.in`, `www.quora.com`, `www.tripadvisor.in`, `www.team-bhp.com`, `www.mouthshut.com`, `www.trustpilot.com`, `www.flipkart.com`, `www.google.com`, `suggestqueries.google.com`, `trends.google.com`, `html.duckduckgo.com`.

## Tagging vocabulary

`taxonomy.json` holds 12 customer segments and 25 topic themes. The segments follow section 10 of the Surtiflavour brand guide (travellers abroad, students abroad, parents sending parcels, trekkers and Indian travellers, hostel students) and split the top segment into business, family, friends, Jain and package-tour travellers.

## Tests

```bash
python -m pytest -q
```

The tests use invented fixture text marked `TEST FIXTURE ONLY`. A test fails if any fixture text is ever found in `data/` or `output/`.

## Privacy

Search queries sent to outside services use category words only. The brand name is not sent in any query.
