import type { Metadata } from "next";
import { Lightbulb, Share2, FileText, BarChart3, ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand Strategy, Social Media Marketing, Content Marketing, and Performance Marketing — everything your D2C brand needs to break through.",
};

const services = [
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Brand Strategy & Identity",
    description: "From market positioning to visual identity — we build the foundation that makes your D2C brand unmistakable and unforgettable.",
    deliverables: ["Brand Positioning", "Visual Identity System", "Brand Guidelines", "Messaging Framework"],
    href: "/services/brand-strategy",
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: "Social Media Marketing",
    description: "Scroll-stopping content and community building that turns followers into customers and customers into brand advocates.",
    deliverables: ["Content Calendar", "Creative Production", "Community Management", "Analytics & Reporting"],
    href: "/services/social-media-marketing",
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Content Marketing",
    description: "SEO-driven content strategy that builds thought leadership, drives organic traffic, and compounds returns over time.",
    deliverables: ["Content Strategy", "Blog & Article Writing", "SEO Optimization", "Distribution Plan"],
    href: "/services/content-marketing",
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Performance Marketing",
    description: "Data-driven paid campaigns across Meta, Google, and emerging platforms that maximize ROAS and systematically reduce CAC.",
    deliverables: ["Campaign Strategy", "Ad Creative", "A/B Testing", "ROAS Optimization"],
    href: "/services/performance-marketing",
  },
];

const comparison = [
  { feature: "Strategic thinking", iconic: true, inhouse: "Sometimes", freelancer: false },
  { feature: "D2C expertise", iconic: true, inhouse: "Varies", freelancer: false },
  { feature: "Full-stack capability", iconic: true, inhouse: "Expensive", freelancer: false },
  { feature: "Cost efficiency", iconic: "₹75K-5L/mo", inhouse: "₹5L+/mo", freelancer: "₹10-30K/mo" },
  { feature: "Speed of execution", iconic: true, inhouse: "Slow ramp-up", freelancer: "Inconsistent" },
  { feature: "Accountability", iconic: true, inhouse: true, freelancer: false },
  { feature: "Data-driven approach", iconic: true, inhouse: "Varies", freelancer: false },
];

export default function ServicesPage() {
  return (
    <>
      <div className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h1 className="font-heading text-4xl font-bold text-text-primary sm:text-5xl">
              Everything Your D2C Brand Needs to{" "}
              <span className="text-accent">Break Through</span>
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Four integrated services. One strategic partner. Zero guesswork.
            </p>
          </div>

          {/* Service Cards */}
          <div className="mb-20 grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-xl border border-border bg-bg-secondary p-8 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                  {service.icon}
                </div>
                <h3 className="mb-3 font-heading text-2xl font-bold text-text-primary">
                  {service.title}
                </h3>
                <p className="mb-4 text-text-secondary leading-relaxed">
                  {service.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <span key={d} className="rounded-full border border-border bg-bg-tertiary px-3 py-1 text-xs text-text-secondary">
                      {d}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* How Services Connect */}
          <div className="mb-20">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-text-primary">
              How Our Services <span className="text-accent">Work Together</span>
            </h2>
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
              {["Brand Strategy", "Social Media", "Content", "Performance"].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent font-heading font-bold">
                      {i + 1}
                    </div>
                    <span className="mt-2 text-sm font-medium text-text-primary">{step}</span>
                  </div>
                  {i < 3 && (
                    <ArrowRight className="hidden h-5 w-5 text-accent/50 md:block" />
                  )}
                </div>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-xl text-center text-sm text-text-secondary">
              Each service builds on the previous one. Brand strategy sets the foundation,
              social media amplifies it, content compounds it, and performance marketing scales it.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="mb-20">
            <h2 className="mb-4 text-center font-heading text-2xl font-bold text-text-primary">
              Why Not Hire <span className="text-accent">In-House?</span>
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-center text-sm text-text-secondary">
              We get asked this a lot. Here&apos;s an honest comparison.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-heading text-text-primary">Feature</th>
                    <th className="px-4 py-3 text-center font-heading text-accent">Brand Iconic</th>
                    <th className="px-4 py-3 text-center font-heading text-text-primary">In-House Team</th>
                    <th className="px-4 py-3 text-center font-heading text-text-primary">Freelancers</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature} className="border-b border-border/50">
                      <td className="px-4 py-3 text-text-secondary">{row.feature}</td>
                      {(["iconic", "inhouse", "freelancer"] as const).map((col) => (
                        <td key={col} className="px-4 py-3 text-center">
                          {row[col] === true ? (
                            <Check className="mx-auto h-4 w-4 text-accent" />
                          ) : row[col] === false ? (
                            <X className="mx-auto h-4 w-4 text-red-400/60" />
                          ) : (
                            <span className="text-xs text-text-secondary">{row[col]}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CTASection
        title="Not Sure What You Need?"
        subtitle="Book a free brand audit and we'll recommend the right services for your brand's stage."
        ctaText="Book a Free Brand Audit"
      />
    </>
  );
}
