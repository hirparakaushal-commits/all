import type { Metadata } from "next";
import { Target, Search, Lightbulb, Zap, Eye, Shield } from "lucide-react";
import { TeamCard } from "@/components/cards/TeamCard";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Brand Iconic is India's premier AI-native branding agency built exclusively for D2C brands. Learn about our mission, team, and why we focus on D2C.",
};

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Outcome Over Output",
    description: "We measure success by revenue impact, not deliverables shipped. Every campaign ties back to business metrics.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Research Before Execution",
    description: "Every strategy starts with data — market analysis, competitor audit, and customer research. No guesswork.",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Radical Transparency",
    description: "Real-time dashboards, weekly reports, and honest conversations. You'll always know where your money goes.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Speed Without Compromise",
    description: "AI-native workflows mean we deliver in days what traditional agencies take weeks for — without cutting corners.",
  },
];

const team = [
  { name: "Kaushal Hirpara", role: "Founder & CEO", bio: "D2C brand strategist with 8+ years of experience building brands that break revenue ceilings across India." },
  { name: "Neha Gupta", role: "Head of Brand Strategy", bio: "Former brand lead at a top-10 D2C brand. Specializes in positioning and visual identity systems." },
  { name: "Rahul Krishnan", role: "Creative Director", bio: "Award-winning creative who's designed identities for 30+ consumer brands across India and Southeast Asia." },
  { name: "Ananya Reddy", role: "Head of Performance", bio: "Performance marketing expert who's managed ₹50Cr+ in ad spend across Meta, Google, and programmatic." },
];

export default function AboutPage() {
  return (
    <>
      <div className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold text-text-primary sm:text-5xl">
              We Build Brands That{" "}
              <span className="text-accent">Command Premium</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              Brand Iconic exists because too many great D2C products are stuck
              with forgettable brands. We&apos;re here to change that.
            </p>
          </div>

          {/* Story */}
          <div className="mx-auto mb-20 max-w-3xl">
            <h2 className="mb-6 font-heading text-2xl font-bold text-text-primary">
              Our Story
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Brand Iconic was born from a simple observation: India&apos;s D2C
                ecosystem is exploding, but most brands look and sound exactly the
                same. Thousands of founders are building exceptional products, only
                to watch them get lost in a sea of generic branding and
                cookie-cutter marketing.
              </p>
              <p>
                We saw an opportunity to build an agency that truly understands the
                D2C playbook — unit economics, CAC pressure, the founder&apos;s
                dilemma of growth vs. profitability. An agency that doesn&apos;t
                just make things pretty, but makes things <em>work</em>.
              </p>
              <p>
                As an AI-native agency, we combine strategic depth with execution
                speed. Our AI-powered workflows let us deliver in days what
                traditional agencies take weeks for, while our strategists bring
                the creative intuition that no algorithm can replace.
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mb-20 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-bg-secondary p-8">
              <div className="mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                <h3 className="font-heading text-xl font-bold text-text-primary">Mission</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">
                To be the branding partner that helps India&apos;s D2C brands
                break through revenue ceilings by building brands that command
                premium pricing, earn customer loyalty, and scale sustainably.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-bg-secondary p-8">
              <div className="mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                <h3 className="font-heading text-xl font-bold text-text-primary">Vision</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">
                A world where every great D2C product has an equally great brand
                behind it — one that customers love, competitors respect, and
                investors bet on.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-text-primary">
              What We <span className="text-accent">Stand For</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl border border-border bg-bg-secondary p-6 transition-all hover:border-accent/30"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {value.icon}
                  </div>
                  <h3 className="mb-2 font-heading text-base font-semibold text-text-primary">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-text-primary">
              The <span className="text-accent">Team</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <TeamCard key={member.name} {...member} />
              ))}
            </div>
          </div>

          {/* Why D2C */}
          <div className="mx-auto max-w-3xl rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
            <h2 className="mb-4 font-heading text-2xl font-bold text-text-primary">
              Why Only D2C?
            </h2>
            <p className="text-text-secondary leading-relaxed">
              We deliberately focus on D2C because we believe specialization
              beats generalization. By working exclusively with direct-to-consumer
              brands, we&apos;ve built deep expertise in the unique challenges
              they face — from performance marketing economics to brand-building
              in a marketplace-dominated landscape. When your agency understands
              your business model, the work is simply better.
            </p>
          </div>
        </div>
      </div>
      <CTASection />
    </>
  );
}
