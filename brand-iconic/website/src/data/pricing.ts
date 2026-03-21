import type { PricingTier, FAQ } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "₹75K – ₹1L/month",
    target: "Bootstrapped D2C brands (pre-revenue to ₹1Cr)",
    description:
      "Get your brand foundations right without burning through your runway. Ideal for early-stage D2C brands that need a professional identity and social presence without a ₹5L/month commitment.",
    features: [
      "Comprehensive Brand Audit & Recommendations",
      "Visual Identity Refresh (logo, colours, typography)",
      "Social Media Template Suite (15 branded templates)",
      "Monthly Content Calendar with Copy",
      "Basic Social Media Management (3 posts/week)",
      "Quarterly Brand Review Call",
      "Email & Chat Support",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "₹1.5L – ₹3L/month",
    target: "Scaling D2C brands (₹1Cr – ₹10Cr revenue)",
    description:
      "The full growth engine for brands ready to break through the ₹10Cr ceiling. Brand strategy, content, and social media working as one integrated system — not three disconnected agencies.",
    features: [
      "Full Brand Strategy & Positioning",
      "Complete Visual Identity System & Packaging",
      "Social Media Management (5 posts/week, 2 platforms)",
      "Content Marketing (6-8 blogs/month, SEO-optimised)",
      "Email Newsletter Strategy & Execution",
      "Influencer & UGC Campaign Management",
      "Monthly Performance Reports with Revenue Attribution",
      "Fortnightly Strategy Calls",
      "Dedicated Account Manager",
    ],
    highlighted: true,
    cta: "Most Popular — Book a Call",
  },
  {
    name: "Scale",
    price: "₹3L – ₹5L/month",
    target: "₹10Cr+ or funded D2C brands ready to dominate",
    description:
      "Full-service brand and growth partnership for brands competing at scale. Everything in Growth, plus performance marketing, advanced creative production, and a dedicated strategist embedded in your team.",
    features: [
      "Everything in Growth Tier",
      "Performance Marketing Management (Meta, Google, YouTube)",
      "15-20 Ad Creatives/Month with Structured Testing",
      "Advanced Packaging & Product Launch Design",
      "Landing Page Design & CRO Recommendations",
      "Full-Funnel Attribution & Analytics Dashboard",
      "Dedicated Brand Strategist (embedded in your team)",
      "Weekly Strategy Calls",
      "Priority Response (< 4 hours on business days)",
      "Quarterly Brand Health & Market Analysis Report",
    ],
    highlighted: false,
    cta: "Talk to Us",
  },
];

export const pricingFaqs: FAQ[] = [
  {
    question: "Why is pricing shown as a range instead of a fixed number?",
    answer:
      "Every D2C brand has different needs. A ₹2Cr skincare brand and a ₹8Cr food brand at the same tier will need different levels of effort. We scope each engagement based on your specific goals, number of SKUs, platforms, and content volume. The range gives you a realistic budget expectation — your exact price is confirmed after our discovery call.",
  },
  {
    question: "Are there any long-term contracts or lock-in periods?",
    answer:
      "We work on 3-month rolling contracts with a 30-day notice period after the initial term. We believe results should keep you, not contracts. That said, branding and content marketing are compounding investments — clients who stay 6+ months see dramatically better results than those who switch agencies every quarter.",
  },
  {
    question: "Is ad spend included in the pricing?",
    answer:
      "No. The prices listed are for our strategy, creative, and management services only. Your ad spend on Meta, Google, or YouTube is billed directly to your ad accounts. For the Scale tier, we recommend a minimum of ₹3L/month in ad spend to generate meaningful results. We never take a percentage of your ad spend — our flat fee keeps incentives aligned.",
  },
  {
    question: "Can we start with one service and add more later?",
    answer:
      "Absolutely. Many clients start with Brand Strategy (Starter tier) and upgrade to Growth or Scale as they see results. Our systems are designed to layer on top of each other — brand strategy strengthens social media, content marketing improves ad performance, and so on. We'll recommend the right starting point based on your current revenue stage.",
  },
  {
    question: "What results can we realistically expect?",
    answer:
      "It depends on your starting point, but here are benchmarks from our existing clients: Starter tier brands typically see improved brand consistency and 20-30% better social engagement within 3 months. Growth tier brands see 30-45% CAC reduction and 2-3x organic traffic growth within 6 months. Scale tier brands typically achieve 2-4x ROAS improvement and significant revenue growth within 90 days of performance marketing launch.",
  },
];
