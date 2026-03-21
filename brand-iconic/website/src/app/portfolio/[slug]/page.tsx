import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { portfolioItems, getPortfolioBySlug } from "@/data/portfolio";
import { CTASection } from "@/components/sections/CTASection";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.title} — Case Study`,
    description: `See how Brand Iconic helped ${item.title} achieve ${item.resultMetric}. ${item.challenge.slice(0, 120)}`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) notFound();

  const currentIndex = portfolioItems.findIndex((p) => p.slug === slug);
  const prevItem =
    portfolioItems[(currentIndex - 1 + portfolioItems.length) % portfolioItems.length];
  const nextItem =
    portfolioItems[(currentIndex + 1) % portfolioItems.length];

  return (
    <>
      <div className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/portfolio"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>

          {/* Hero */}
          <div className="mb-12">
            <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
              {item.category}
            </span>
            <h1 className="font-heading text-4xl font-bold text-text-primary sm:text-5xl">
              {item.title}
            </h1>
            <p className="mt-3 text-xl font-medium text-accent">
              {item.resultMetric}
            </p>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mb-12 aspect-[16/9] rounded-xl bg-gradient-to-br from-bg-tertiary to-bg-secondary border border-border flex items-center justify-center">
            <span className="font-heading text-3xl font-bold text-text-secondary/20">
              {item.title}
            </span>
          </div>

          {/* Challenge */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-2xl font-bold text-text-primary">
              The Challenge
            </h2>
            <p className="text-text-secondary leading-relaxed">{item.challenge}</p>
          </section>

          {/* Strategy */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-2xl font-bold text-text-primary">
              The Strategy
            </h2>
            <p className="text-text-secondary leading-relaxed">{item.strategy}</p>
          </section>

          {/* Execution */}
          <section className="mb-12">
            <h2 className="mb-4 font-heading text-2xl font-bold text-text-primary">
              The Execution
            </h2>
            <p className="text-text-secondary leading-relaxed">{item.execution}</p>
          </section>

          {/* Results */}
          <section className="mb-12">
            <h2 className="mb-6 font-heading text-2xl font-bold text-text-primary">
              The Results
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.results.map((result) => (
                <div
                  key={result.label}
                  className="rounded-xl border border-accent/20 bg-accent/5 p-6 text-center"
                >
                  <p className="font-mono text-3xl font-bold text-accent">
                    {result.value}
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    {result.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonial */}
          {item.testimonial && (
            <section className="mb-12 rounded-xl border border-border bg-bg-secondary p-8">
              <Quote className="mb-4 h-8 w-8 text-accent/60" />
              <p className="mb-4 text-lg italic text-text-secondary leading-relaxed">
                &ldquo;{item.testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="font-heading font-semibold text-text-primary">
                  {item.testimonial.author}
                </p>
                <p className="text-sm text-text-secondary">
                  {item.testimonial.role}, {item.testimonial.company}
                </p>
              </div>
            </section>
          )}

          {/* Prev/Next */}
          <div className="flex items-center justify-between border-t border-border pt-8">
            <Link
              href={`/portfolio/${prevItem.slug}`}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{prevItem.title}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
            <Link
              href={`/portfolio/${nextItem.slug}`}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              <span className="hidden sm:inline">{nextItem.title}</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <CTASection title="Ready for Similar Results?" />
    </>
  );
}
