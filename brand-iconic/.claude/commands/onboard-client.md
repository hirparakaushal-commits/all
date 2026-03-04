# Skill: /onboard-client
## Trigger: New Client Onboarding Workflow

**Your role:** Client Success Agent + Brand Strategist combined.

This skill runs the complete onboarding sequence for a newly signed client.
Goal: Make them feel confident from day one that they made the right decision.

---

## ONBOARDING CHECKLIST

### Day 0: Contract Signed
- [ ] Create client folder: `/clients/[client-slug]/`
- [ ] Copy template from `/clients/_template/`
- [ ] Send welcome email (from `/templates/emails/client-onboarding-v1.md`)
- [ ] Schedule kick-off call

### Day 1-3: Kick-off Call Preparation
Prepare the kick-off call agenda:

```markdown
## Kick-off Call Agenda: [Client Name]
Duration: 60 minutes

1. Introductions (5 min)
2. Their goals — let THEM talk first (15 min)
   - What does success look like in 90 days?
   - What does success look like in 6 months?
   - What would make them consider this engagement a failure?
3. Their current situation (10 min)
   - What have they tried before?
   - What's worked? What hasn't?
   - What constraints should we know about?
4. Our approach — walk them through our process (10 min)
5. Communication preferences (5 min)
   - How often do they want updates?
   - What format? (Slack, email, monthly call?)
   - Who is the primary contact on their side?
6. Immediate next steps — clear, dated (5 min)
7. Questions (10 min)
```

### Day 3-5: Brand Brief Completion
Run `/brand-audit` on their existing brand.
Complete `/clients/[client-slug]/brand-brief.md` with:
- Their current positioning
- Their ICP (as they define it)
- Their current channels
- Their main competitors (as they see them)
- Their goals (verbatim from kick-off call)
- Constraints and preferences

### Day 7: 90-Day Strategy
Produce initial strategy document: `/clients/[client-slug]/strategy.md`
- Month 1 focus
- Month 2 focus
- Month 3 focus
- Key metrics we'll track
- Milestones and check-in schedule

### Day 7: Baseline Metrics
Document starting metrics (so we can prove improvement later):
- Current website traffic
- Current social following / engagement rate
- Current lead volume
- Current revenue (if they share)
- Any other agreed KPIs

Save to: `/clients/[client-slug]/baseline-metrics.md`

---

## CLIENT FOLDER STRUCTURE

```
/clients/[client-slug]/
├── brand-brief.md          ← completed at kick-off
├── strategy.md             ← 90-day plan
├── baseline-metrics.md     ← starting point
├── brand-audit-v1.md       ← from /brand-audit skill
├── offer-proposal.md       ← what they purchased
├── deliverables/           ← all work product
│   ├── content/
│   ├── copy/
│   ├── research/
│   └── reports/
└── reports/                ← monthly reports
    └── [YYYY-MM]_monthly-report.md
```
