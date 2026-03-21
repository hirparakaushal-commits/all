import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
  slug: string;
  className?: string;
}

export function BlogCard({
  title,
  excerpt,
  date,
  category,
  readTime,
  slug,
  className,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group block overflow-hidden rounded-xl border border-border bg-bg-secondary transition-all duration-300",
        "hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5",
        className
      )}
    >
      <div className="aspect-[16/9] bg-gradient-to-br from-bg-tertiary to-bg-secondary">
        <div className="flex h-full items-center justify-center">
          <span className="font-heading text-lg font-bold text-text-secondary/20">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <span className="mb-2 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">
          {category}
        </span>
        <h3 className="mb-2 font-heading text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {readTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
