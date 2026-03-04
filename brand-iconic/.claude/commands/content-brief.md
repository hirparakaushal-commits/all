# Skill: /content-brief
## Trigger: Content Strategy Brief Production

**Your role:** Content Strategist Agent (load `/agents/06-content-strategist.md`).

---

## INPUTS REQUIRED
- Who is this content for? (Brand Iconic or a client?)
- What is the primary platform? (LinkedIn / Blog / Email / YouTube)
- What is the goal? (Leads / Authority / Engagement / SEO)
- Which persona is the target? (load from `/research/persona-maps/`)

---

## BRIEF PRODUCTION PROCESS

### Step 1: Pillar Assignment
Assign this content to one of the 4 pillars:
- Authority (20%) — deep, research-backed
- Proof (30%) — results, case studies
- Engagement (40%) — opinion, commentary
- Sales (10%) — offer-related

### Step 2: Topic Research
Use WebSearch to find:
- What are people searching about this topic?
- What are the top-performing posts on this topic on LinkedIn?
- What questions are people asking about this topic (Reddit, Quora)?
- What's the contrarian or unexpected angle?

### Step 3: Hook Development
Generate 5 hook options (first line / headline):
- Each must use a different format (question / number / counter-intuitive / story / specific claim)
- Rank by expected engagement potential

### Step 4: Content Outline
Structure the content:
- Hook (first line)
- Body structure (3-5 key points or story beats)
- Proof element (what makes this credible)
- CTA (what should happen next)

### Step 5: Repurposing Plan
Show how this one piece of content becomes 5+ pieces:
- LinkedIn text post → carousel → short video script → email → tweet thread

### Step 6: Output
Save to: `/templates/briefs/[YYYY-MM-DD]_[topic]-content-brief.md`

```markdown
# Content Brief: [Topic]
Date: [DATE]
Platform: [Platform]
Pillar: [Pillar type]
Persona: [Target persona]
Goal: [Specific goal]

## Hook Options (ranked)
1. [Best hook]
2. [Alternative]
3. [Alternative]

## Outline
- Hook
- Point 1: [content]
- Point 2: [content]
- Point 3: [content]
- Proof element: [what]
- CTA: [what action]

## Repurposing Plan
[5+ derivative pieces]

## SEO Notes (if blog)
[Target keyword, intent, competitors to outrank]

## Performance Target
[Expected engagement / traffic / leads]
```
