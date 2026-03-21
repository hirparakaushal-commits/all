"use client";

import { useState } from "react";
import { portfolioItems, portfolioCategories } from "@/data/portfolio";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { CTASection } from "@/components/sections/CTASection";
import { cn } from "@/lib/utils";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="font-heading text-4xl font-bold text-text-primary sm:text-5xl">
              Work That Speaks{" "}
              <span className="text-accent">Louder Than Pitches</span>
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Real results for real D2C brands across India.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {["All", ...portfolioCategories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all",
                  activeCategory === cat
                    ? "bg-accent text-bg-primary"
                    : "border border-border text-text-secondary hover:border-accent/50 hover:text-accent"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <PortfolioCard
                key={item.slug}
                title={item.title}
                category={item.category}
                resultMetric={item.resultMetric}
                thumbnail={item.thumbnail}
                href={`/portfolio/${item.slug}`}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-text-secondary">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
      <CTASection
        title="Want Results Like These?"
        subtitle="Book a free brand audit and let's discuss how we can transform your D2C brand."
      />
    </>
  );
}
