"use client";

import { useState } from "react";
import { blogPosts } from "@/data/blog";
import { BlogCard } from "@/components/cards/BlogCard";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Brand Strategy",
  "D2C Growth",
  "Social Media",
  "Content Marketing",
  "Case Studies",
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = blogPosts.find((p) => p.featured);
  const filtered =
    activeCategory === "All"
      ? blogPosts.filter((p) => !p.featured)
      : blogPosts.filter(
          (p) => p.category === activeCategory && !p.featured
        );

  return (
    <div className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="font-heading text-4xl font-bold text-text-primary sm:text-5xl">
            Insights for D2C Founders Who{" "}
            <span className="text-accent">Think Like Brand Builders</span>
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Actionable strategies, market insights, and brand-building
            frameworks.
          </p>
        </div>

        {/* Featured Post */}
        {featured && activeCategory === "All" && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-12 block overflow-hidden rounded-xl border border-border bg-bg-secondary transition-all hover:border-accent/40"
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-[16/9] bg-gradient-to-br from-bg-tertiary to-bg-secondary md:aspect-auto">
                <div className="flex h-full items-center justify-center p-8">
                  <span className="font-heading text-2xl font-bold text-text-secondary/20">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="mb-3 inline-block w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">
                  {featured.category}
                </span>
                <h2 className="mb-3 font-heading text-2xl font-bold text-text-primary group-hover:text-accent transition-colors">
                  {featured.title}
                </h2>
                <p className="mb-4 text-text-secondary leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {featured.readTime} min read
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Read More <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
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

        {/* Blog Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-text-secondary">
            No posts found in this category.
          </div>
        )}

        {/* Newsletter */}
        <div className="mx-auto mt-20 max-w-xl rounded-xl border border-border bg-bg-secondary p-8 text-center">
          <h3 className="font-heading text-xl font-bold text-text-primary">
            Get Weekly D2C Branding Insights
          </h3>
          <p className="mt-2 text-sm text-text-secondary">No fluff. Just actionable strategies.</p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 rounded-lg border border-border bg-bg-tertiary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
            />
            <button className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-light">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
