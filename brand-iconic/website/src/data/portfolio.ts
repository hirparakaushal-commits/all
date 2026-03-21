import type { PortfolioItem } from "@/types";

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "freshbrew",
    title: "FreshBrew — From Local Roaster to National D2C Coffee Brand",
    category: "Brand Identity",
    thumbnail: "/images/portfolio/freshbrew.jpg",
    heroImage: "/images/portfolio/freshbrew-hero.jpg",
    resultMetric: "3.2x Revenue Growth",
    challenge:
      "FreshBrew was a Bangalore-based specialty coffee brand stuck at ₹8Cr annual revenue. Their product was exceptional — single-origin beans sourced directly from Coorg and Chikmagalur estates — but their brand looked like a local chai shop. Packaging was generic, the website felt templated, and customers couldn't distinguish them from the 200+ coffee brands flooding Instagram. They'd spent ₹15L on two previous branding agencies with nothing to show for it except a logo they still didn't love.",
    strategy:
      "We positioned FreshBrew as 'India's farm-to-cup coffee experience' — the only brand telling the full story from estate to doorstep. Instead of competing on price or generic 'premium coffee' messaging, we built the brand around transparency and traceability. Every bag tells you the exact estate, altitude, and roasting date. We designed a packaging system with distinct colour codes for each origin region, creating shelf recognition and collectibility.",
    execution:
      "Complete brand overhaul over 8 weeks: new visual identity system, packaging redesign across 12 SKUs, website rebuild with an immersive origin-story experience, social media content system with estate visit reels and brewing tutorial series. We also designed a subscription box experience with custom unboxing elements that drove a 4x increase in UGC.",
    results: [
      { label: "Revenue Growth", value: "3.2x in 12 months" },
      { label: "Average Order Value", value: "₹1,850 → ₹2,400" },
      { label: "Subscription Rate", value: "35% of customers" },
      { label: "Organic Social Growth", value: "8K → 62K followers" },
    ],
    testimonial: {
      quote:
        "We'd worked with two agencies before Brand Iconic and were honestly sceptical. But within 3 months of the rebrand, our DTC revenue crossed what we'd done in the entire previous year. They didn't just make us look good — they made customers feel something about our brand.",
      author: "Arjun Menon",
      role: "Co-founder & CEO",
      company: "FreshBrew",
    },
  },
  {
    slug: "glownaturals",
    title: "GlowNaturals — Slashing CAC by 45% Through Social-First Branding",
    category: "Social Media",
    thumbnail: "/images/portfolio/glownaturals.jpg",
    heroImage: "/images/portfolio/glownaturals-hero.jpg",
    resultMetric: "45% CAC Reduction",
    challenge:
      "GlowNaturals is a D2C skincare brand offering Ayurveda-inspired products for urban millennials. They were spending ₹8L/month on Meta ads with a CAC of ₹1,400 on products with an AOV of ₹1,800 — leaving almost nothing after COGS and shipping. Their social media was a mix of product shots and motivational quotes that generated likes but zero sales. Organic contributed less than 5% of total revenue.",
    strategy:
      "We rebuilt their entire social presence around 'real skin journeys' — shifting from polished product photography to authentic, dermat-backed educational content. We created a content pillar system: Ingredient Deep Dives, 30-Day Skin Challenges, Founder's Lab Notes, and Customer Transformation Stories. Each pillar mapped to a specific stage of the purchase journey. We also launched a micro-influencer programme targeting skincare enthusiasts with 2K-20K followers.",
    execution:
      "Month 1-2: Complete social strategy overhaul, content pillar rollout, and influencer onboarding (45 micro-influencers). Month 3-4: Launched the #GlowIn30 challenge that generated 2,800+ UGC posts. Month 5-6: Introduced Instagram Shopping integration and DM-to-checkout flows. We created 120+ content pieces per month across formats — reels, carousels, stories, and lives.",
    results: [
      { label: "CAC Reduction", value: "₹1,400 → ₹770 (45%)" },
      { label: "Organic Revenue Share", value: "5% → 32%" },
      { label: "Monthly Revenue", value: "₹28L → ₹52L" },
      { label: "Engagement Rate", value: "1.2% → 5.8%" },
    ],
    testimonial: {
      quote:
        "Brand Iconic didn't just 'manage our social media' — they turned Instagram into our most profitable sales channel. Our CAC dropped by nearly half and for the first time, organic is a real revenue driver. The team thinks like D2C operators, not just marketers.",
      author: "Priya Sharma",
      role: "Founder",
      company: "GlowNaturals",
    },
  },
  {
    slug: "urbanfit",
    title: "UrbanFit — From Zero to ₹12Cr Revenue in 18 Months",
    category: "Full Service",
    thumbnail: "/images/portfolio/urbanfit.jpg",
    heroImage: "/images/portfolio/urbanfit-hero.jpg",
    resultMetric: "₹12Cr Revenue in 18 Months",
    challenge:
      "UrbanFit launched as a D2C fitness apparel brand in a market dominated by HRX, Cult.fit merch, and dozens of Instagram brands selling the same imported blanks with printed logos. The founders had ₹50L in seed funding, great product (performance fabrics manufactured in Tirupur), and zero brand presence. They needed to go from zero to ₹1Cr/month within 18 months to raise their Series A.",
    strategy:
      "We positioned UrbanFit as 'engineered for the Indian athlete' — addressing the gap between cheap gym wear and overpriced international brands. The strategy centred on three pillars: technical credibility (fabric technology storytelling), community building (partnering with CrossFit boxes and running clubs across metros), and a content-led launch that built audience before the store even opened. We ran a 60-day pre-launch content campaign before a single product was listed.",
    execution:
      "Phase 1 (Month 1-3): Brand identity, packaging, website build, and pre-launch content campaign that generated a 12,000-person waitlist. Phase 2 (Month 4-9): Launch with full-funnel performance marketing, influencer seeding to 100+ fitness creators, and community events in Mumbai, Bangalore, and Delhi. Phase 3 (Month 10-18): Scale performance marketing to ₹15L/month ad spend while maintaining 3.5x ROAS, launched 3 new product lines, and built a content engine producing 80+ pieces per month.",
    results: [
      { label: "Total Revenue (18 months)", value: "₹12Cr" },
      { label: "Monthly Run Rate", value: "₹1.2Cr by month 18" },
      { label: "Blended ROAS", value: "3.5x across channels" },
      { label: "Repeat Purchase Rate", value: "42%" },
    ],
    testimonial: {
      quote:
        "Brand Iconic was our unfair advantage. They didn't just execute — they thought like co-founders. From brand strategy to performance marketing, everything was connected. We hit ₹1Cr/month by month 14 and closed our Series A with revenue numbers that shocked even our investors.",
      author: "Vikram Desai",
      role: "Co-founder",
      company: "UrbanFit",
    },
  },
];

export const portfolioCategories: string[] = [
  "All",
  "Brand Identity",
  "Social Media",
  "Content Marketing",
  "Performance Marketing",
  "Full Service",
];

export function getPortfolioBySlug(slug: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.slug === slug);
}
