import type { Metadata } from "next";
import { Check, Shield } from "lucide-react";
import { PricingCard } from "@/components/cards/PricingCard";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for D2C brands ready to grow. From ₹75K to ₹5L/month — find the right plan for your brand's stage.",
};

const tiers = [
  {
    name: "Starter",
    price: "₹75K - ₹1L",
    target: "Brands beginning to invest in branding",
    description: "Perfect for bootstrapped D2C brands ready to build a strong foundation.",
    features: [
      "Comprehensive brand audit",
      "Visual identity refresh",
      "Social media templates (20+)",
      "Brand guidelines document",
      "Monthly strategy call",
      "Email support",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "₹1.5L - ₹3L",
    target: "D2C brands at ₹1Cr - ₹10Cr revenue",
    description: "Full-stack branding and marketing for brands ready to scale.",
    features: [
      "Everything in Starter",
      "Full brand strategy & positioning",
      "Social media management",
      "Content strategy & creation",
      "Monthly performance reporting",
      "Bi-weekly strategy calls",
      "Dedicated account manager",
      "Competitor monitoring",
    ],
    highlighted: true,
    cta: "Start Growing",
  },
  {
    name: "Scale",
    price: "₹3L - ₹5L",
    target: "₹10Cr+ or funded D2C brands",
    description: "Enterprise-grade branding with performance marketing and a dedicated team.",
    features: [
      "Everything in Growth",
      "Performance marketing (Meta + Google)",
      "Packaging & product design",
      "Dedicated brand strategist",
      "Weekly strategy calls",
      "Priority support (4-hour response)",
      "Custom reporting dashboard",
      "Influencer partnership strategy",
    ],
    cta: "Let's Talk",
  },
];

const comparisonFeatures = [
  { feature: "Brand Strategy", starter: true, growth: true, scale: true },
  { feature: "Visual Identity", starter: true, growth: true, scale: true },
  { feature: "Social Media Management", starter: false, growth: true, scale: true },
  { feature: "Content Creation", starter: false, growth: true, scale: true },
  { feature: "Performance Marketing", starter: false, growth: false, scale: true },
  { feature: "Packaging Design", starter: false, growth: false, scale: true },
  { feature: "Dedicated Strategist", starter: false, growth: false, scale: true },
  { feature: "Monthly Reporting", starter: true, growth: true, scale: true },
  { feature: "Strategy Calls", starter: "Monthly", growth: "Bi-weekly", scale: "Weekly" },
  { feature: "Support Response", starter: "48 hours", growth: "24 hours", scale: "4 hours" },
];

const faqs = [
  { q: "Can I customize a plan for my specific needs?", a: "Absolutely. These tiers are starting points. We'll tailor the scope, deliverables, and pricing to your brand's specific challenges and goals after our initial audit call." },
  { q: "What's the minimum commitment?", a: "We require a 3-month minimum engagement. Brand building takes time, and we've seen that anything shorter doesn't give strategies enough runway to show results." },
  { q: "Do you offer outcome-based pricing?", a: "Yes, for Scale tier clients we can structure part of the fee as performance-based, tied to agreed-upon KPIs like revenue growth or CAC reduction." },
  { q: "What if I'm not happy with the results?", a: "We offer a 30-day satisfaction guarantee. If you're not seeing value in the first month, we'll either adjust our approach or part ways — no questions asked." },
  { q: "How quickly can we get started?", a: "After signing, we kick off with a brand audit within 48 hours. You'll see your first strategy document within 2 weeks of onboarding." },
];

export default function PricingPage() {
  return (
    <>
      <div className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h1 className="font-heading text-4xl font-bold text-text-primary sm:text-5xl">
              Transparent Pricing for D2C Brands{" "}
              <span className="text-accent">Ready to Grow</span>
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              We don&apos;t sell deliverables. We sell outcomes.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mb-20 grid gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <PricingCard key={tier.name} {...tier} />
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mb-20">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-text-primary">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-heading text-text-primary">Feature</th>
                    <th className="px-4 py-3 text-center font-heading text-text-primary">Starter</th>
                    <th className="px-4 py-3 text-center font-heading text-accent">Growth</th>
                    <th className="px-4 py-3 text-center font-heading text-text-primary">Scale</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row) => (
                    <tr key={row.feature} className="border-b border-border/50">
                      <td className="px-4 py-3 text-text-secondary">{row.feature}</td>
                      {(["starter", "growth", "scale"] as const).map((tier) => (
                        <td key={tier} className="px-4 py-3 text-center">
                          {typeof row[tier] === "boolean" ? (
                            row[tier] ? (
                              <Check className="mx-auto h-4 w-4 text-accent" />
                            ) : (
                              <span className="text-text-secondary/30">—</span>
                            )
                          ) : (
                            <span className="text-text-primary text-xs">{row[tier]}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Guarantee */}
          <div className="mx-auto mb-20 max-w-2xl rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
            <Shield className="mx-auto mb-4 h-10 w-10 text-accent" />
            <h2 className="mb-3 font-heading text-2xl font-bold text-text-primary">
              30-Day Satisfaction Guarantee
            </h2>
            <p className="text-text-secondary leading-relaxed">
              If you&apos;re not seeing value within the first 30 days, we&apos;ll
              either adjust our approach to better serve your needs or part ways
              with no hard feelings. Your success is our reputation.
            </p>
          </div>

          {/* FAQ */}
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-text-primary">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-border bg-bg-secondary p-5">
                  <h3 className="font-heading text-base font-semibold text-text-primary">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CTASection
        title="Not Sure Which Plan Fits?"
        subtitle="Book a free brand audit call and we'll recommend the right plan for your brand's stage."
        ctaText="Book a Free Consultation"
      />
    </>
  );
}
