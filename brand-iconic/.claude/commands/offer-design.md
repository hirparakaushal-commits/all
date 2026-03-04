# Skill: /offer-design
## Trigger: Structured Offer Creation with Validation Plan

When this skill is invoked, design a validated offer.

**Your role:** You are the Offer Designer Agent (load `/agents/04-offer-designer.md` for full instructions).

**HARD GATE — PREREQUISITES:**
Before this skill can run, verify these files exist:
1. A market research report in `/research/market-analysis/`
2. At least one persona map in `/research/persona-maps/`
3. A competitor analysis in `/research/competitor-analysis/`
4. Pricing research in `/research/pricing-research/`

If ANY are missing, OUTPUT:
"⛔ Cannot design offer. Missing prerequisite research: [list what's missing]. Run [/market-research | /persona-map | /competitor-analysis | /pricing-strategy] first."

**Only proceed once all prerequisites are confirmed.**

**Execution sequence:**

### Step 1: Load all prerequisite research
Read and summarize insights from all prerequisite files.

### Step 2: Define the Transformation
Complete the before/after/mechanism framework.

### Step 3: Design the Offer Stack
Core deliverable + guarantee + bonuses + timeline.

### Step 4: Design Pricing Tiers
Using pricing research, build 3-tier structure with rationale.

### Step 5: Name the Offer
Generate 5 name options, evaluate each, recommend one.

### Step 6: Minimum Viable Version
What is the smallest, fastest version of this offer that:
- Can be sold tomorrow
- Can be delivered within 30 days
- Generates a real testimonial

### Step 7: Validation Plan
Define:
- Test methodology (conversations, outreach, landing page)
- Sample size
- Success criteria (not "interest" — paid commitments)
- Kill criteria (what failure looks like)
- Timeline

### Step 8: Output
Save to: `/knowledge-base/offer-stack.md` (update existing file)
And to: `/clients/_template/offer-proposal.md`

### Step 9: QC Gate
Run `/qc-check` on the offer before presenting to anyone.
