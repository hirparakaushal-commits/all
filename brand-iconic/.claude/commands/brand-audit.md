# Skill: /brand-audit
## Trigger: Incoming Client Brand Assessment

Run this skill when a new client is onboarded or when auditing Brand Iconic itself.

**Your role:** Brand Strategist + Market Research Agent combined.

---

## AUDIT SCOPE

A brand audit answers one question: **"Is this brand's external presentation aligned with what the market needs to see to trust and buy from them?"**

---

## EXECUTION SEQUENCE

### Step 1: Digital Presence Audit
Fetch and analyze (use WebFetch on all URLs provided):
- Website homepage, about page, services page
- LinkedIn company page + recent posts
- Any other active social platforms
- Google search results for their brand name
- Clutch/G2/review platform profiles (if agency)

### Step 2: Positioning Clarity Test
Answer these questions from the perspective of a first-time visitor:
- What does this company do? (can you tell in 5 seconds?)
- Who is this for? (is the ICP obvious?)
- Why should I believe them? (is proof present and credible?)
- What should I do next? (is the CTA clear?)
- How are they different from competitors? (is differentiation stated?)

Score each: CLEAR / UNCLEAR / MISSING

### Step 3: Messaging Consistency Check
Does the message stay consistent across:
- Headline vs. sub-headline vs. body copy
- Website vs. LinkedIn vs. email
- What they SAY they do vs. what they SHOW they do
- Their claim vs. their proof

### Step 4: Competitive Positioning Check
Load competitor analysis from `/research/competitor-analysis/`.
Compare client's positioning to competitors:
- Are they saying the same thing as 5 other agencies?
- Do they occupy a distinctive position?
- Are they positioned in the right price category?

### Step 5: Trust Architecture Audit
Rate the quality of:
- Case studies (specific results or generic claims?)
- Testimonials (named and detailed or anonymous and vague?)
- Client logos (recognizable or unknown?)
- Team/founder credibility (relevant experience shown?)
- Content quality (demonstrates expertise or just fills space?)

### Step 6: Output
Save to `/clients/[client-slug]/brand-audit-v1.md`:

```markdown
# Brand Audit: [Client Name]
Date: [DATE]
Auditor: Brand Audit Skill

## Overall Brand Health Score: [1-10]

## Positioning Clarity
| Element | Score | Finding | Recommendation |
|---------|-------|---------|----------------|
| 5-second test | | | |
| ICP clarity | | | |
| Proof presence | | | |
| CTA clarity | | | |
| Differentiation | | | |

## Messaging Consistency
[Findings across channels]

## Competitive Position
[Where they sit vs. market]

## Trust Architecture
[Strengths and gaps in proof]

## Top 3 Priority Fixes
1. [Most impactful fix]
2. [Second priority]
3. [Third priority]

## Quick Wins (can be done this week)
[List — low effort, high visibility improvements]

## Strategic Recommendations
[Bigger moves that require planning]
```
