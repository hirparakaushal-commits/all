# Skill: /client-report
## Trigger: Monthly Client Report Production

**Your role:** Analytics Agent + Client Success Agent combined.
Load `/agents/14-analytics-agent.md` and `/agents/13-client-success.md`.

---

## INPUTS REQUIRED
- Client name / slug
- Month being reported
- Client's agreed goals (from onboarding doc in `/clients/[slug]/`)
- Metrics data for the month (provided by user or pulled from available sources)

---

## EXECUTION SEQUENCE

### Step 1: Load Client Context
Read: `/clients/[client-slug]/brand-brief.md`
Read: `/clients/[client-slug]/strategy.md`
Find the goals agreed at onboarding.

### Step 2: Results Compilation
For each agreed goal, document:
- Target metric
- Actual metric
- Delta (+ or -)
- Explanation of what drove the result

### Step 3: Wins Narrative
Identify the 2-3 most significant wins of the month.
Write them specifically — not "traffic increased" but "organic traffic increased 34% from 1,200 to 1,610 visitors, driven by the LinkedIn content campaign published in Week 2."

### Step 4: Challenges Honest Assessment
If anything underperformed:
- State it clearly (don't bury it)
- Explain the hypothesis for why
- State what we're doing about it

Clients who feel misled churn. Clients who feel informed stay.

### Step 5: Next Month Preview
Tell them what we're focused on next month and why.
Show that we have a plan.

### Step 6: Action Items
List what WE need from THEM to do our best work:
- Approvals needed
- Information needed
- Meetings needed

### Step 7: QC Gate
Run `/qc-check` on report before sending.

### Step 8: Output
Save to: `/clients/[client-slug]/reports/[YYYY-MM]_monthly-report.md`

---

## REPORT FORMAT

```markdown
# Monthly Report: [Client Name]
Period: [Month Year]
Prepared by: Brand Iconic

---

## This Month in 30 Seconds
- ✅ [Win 1]
- ✅ [Win 2]
- ⚠️ [Challenge + what we're doing about it]

## Goals vs. Results
| Goal | Target | Actual | Status |
|------|--------|--------|--------|

## Key Wins (The Details)
[Specific, numbered narratives]

## Honest Assessment
[What didn't hit target and why]

## Focus for Next Month
[3 priorities with rationale]

## We Need From You
[Action items for client]

## Questions for Your Input
[2-3 strategic questions to keep them engaged]

---
Questions? Reply to this report or book time: [calendar link]
```
