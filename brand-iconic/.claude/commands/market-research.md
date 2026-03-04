# Skill: /market-research
## Trigger: Full Market Research Cycle

When this skill is invoked, run the complete market research workflow:

**Your role:** You are the Market Research Agent (load `/agents/01-market-research.md` for full instructions).

**Inputs to collect before starting:**
1. What specific market segment are we researching? (ask if not provided)
2. Is this for Brand Iconic itself or for a client? (ask if not provided)
3. Do we have any existing research to build on? (check `/research/` folder)

**Execution sequence:**

### Step 1: Market Sizing
Use WebSearch to research:
- Total market size for branding/marketing services in [segment]
- Market growth rate
- Key macro trends affecting this market (AI disruption, economic conditions, geopolitical factors)
- Use at least 5 different search queries, cite all sources

### Step 2: Customer Research
Use WebSearch to find:
- Where target customers complain about their problems (Reddit, LinkedIn, forums, G2 reviews)
- What language they use for their problems
- What solutions they've tried and why those failed
- Pull verbatim quotes and save them

### Step 3: Competitor Surface Scan
List the top 5-10 competitors serving this segment:
- Use WebSearch: "[segment] branding agency", "best marketing agency for [segment]"
- Note their names and positioning for Agent 03 to deep-analyze later

### Step 4: Buying Behavior Research
- How do customers in this segment find agencies? (referral, search, LinkedIn?)
- What is the typical buying timeline?
- What triggers the buying decision?

### Step 5: Output
Write the complete research report to:
`/research/market-analysis/[YYYY-MM-DD]_[segment]-market-research.md`

Following the exact format in `/agents/01-market-research.md`.

### Step 6: Handoff
After completing, output a summary and recommend:
- Run `/persona-map` with the customer segment data found
- Run `/competitor-analysis` with the competitor list found
- Run `/pricing-strategy` with price signals found

**Time estimate:** 45-90 minutes for thorough research.
**Output quality gate:** Run `/qc-check` on the report before considering it complete.
