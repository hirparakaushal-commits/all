# Skill: /competitor-analysis
## Trigger: Full Competitive Intelligence Cycle

When this skill is invoked, run full competitor analysis.

**Your role:** You are the Competitor Intelligence Agent (load `/agents/03-competitor-intel.md` for full instructions).

**Inputs to collect:**
1. Which competitor to analyze? (if specific one) OR run landscape overview?
2. Which market segment context? (check market research in `/research/market-analysis/`)

**Execution sequence:**

### Step 1: Competitor Discovery
If no competitor specified, discover the top 10 via:
- WebSearch: "best AI branding agency", "top marketing agency [segment]", "branding agency pricing"
- Check Clutch.co, UpCity, G2 for agency directories
- Check LinkedIn company search for agencies targeting our ICP

### Step 2: Per-Competitor Deep Dive
For each competitor, fetch their website and analyze:
- WebFetch their homepage, services page, pricing page (if public)
- WebSearch "[competitor name] reviews", "[competitor name] pricing", "[competitor name] case studies"
- Check their LinkedIn page and content
- Check Clutch/G2 reviews for NEGATIVE feedback specifically

Document using format in `/agents/03-competitor-intel.md`.

### Step 3: Pricing Intelligence
For every competitor:
- Document any public pricing found
- Note pricing model (retainer vs. project vs. performance)
- Note what's included at each price point
- Feed this to `/research/pricing-research/` for Agent 12

### Step 4: Positioning Gap Analysis
After all competitors analyzed, build the positioning matrix:
- Map every competitor on: Price vs. Quality axes
- Map every competitor on: Niche vs. Generalist axes
- Identify empty spaces in the matrix

### Step 5: Output
- Individual files: `/research/competitor-analysis/[YYYY-MM-DD]_[competitor].md`
- Overview file: `/research/competitor-analysis/[YYYY-MM-DD]_landscape-overview.md`

### Step 6: Recommended Positioning
Output 3 positioning options for Brand Iconic with pros/cons of each.
Feed to Agent 05 (Brand Strategist) for final positioning decision.
