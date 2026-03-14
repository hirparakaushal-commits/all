import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Linkedin, Twitter, Share2 } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { BlogCard } from "@/components/cards/BlogCard";
import { CTASection } from "@/components/sections/CTASection";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/constants";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);
  const fallbackPosts =
    relatedPosts.length > 0
      ? relatedPosts
      : blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const shareUrl = `${siteConfig.url}/blog/${slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <>
      <div className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
              {post.category}
            </span>
            <h1 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readTime} min read
              </span>
            </div>
          </header>

          {/* Featured Image Placeholder */}
          <div className="mb-10 aspect-[16/9] rounded-xl bg-gradient-to-br from-bg-tertiary to-bg-secondary border border-border flex items-center justify-center">
            <span className="font-heading text-2xl font-bold text-text-secondary/20">
              {post.category}
            </span>
          </div>

          {/* Article Body (placeholder) */}
          <article className="prose prose-invert max-w-none mb-12">
            <p className="text-lg leading-relaxed text-text-secondary">
              {post.excerpt}
            </p>
            <div className="mt-8 rounded-xl border border-border bg-bg-secondary p-8 text-center">
              <p className="text-text-secondary">
                Full article content coming soon. This is a placeholder for the
                MDX-rendered blog post content.
              </p>
            </div>
          </article>

          {/* Share Buttons */}
          <div className="mb-12 flex items-center gap-3 border-t border-border pt-6">
            <span className="text-sm text-text-secondary">Share:</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent/50 hover:text-accent transition-all"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent/50 hover:text-accent transition-all"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent/50 hover:text-accent transition-all"
            >
              <Share2 className="h-4 w-4" />
            </a>
          </div>

          {/* Author Bio */}
          <div className="mb-12 rounded-xl border border-border bg-bg-secondary p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-tertiary">
                <User className="h-6 w-6 text-text-secondary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-text-primary">
                  {post.author}
                </p>
                <p className="text-sm text-text-secondary">
                  Brand strategist and D2C marketing expert at Brand Iconic.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {fallbackPosts.length > 0 && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 font-heading text-2xl font-bold text-text-primary">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fallbackPosts.map((p) => (
                <BlogCard key={p.slug} {...p} />
              ))}
            </div>
          </div>
        )}
      </div>
      <CTASection
        title="Want Us to Apply This to Your Brand?"
        subtitle="Book a free brand audit and let's put these strategies to work for your D2C brand."
        ctaText="Talk to Us"
      />
    </>
  );
}
