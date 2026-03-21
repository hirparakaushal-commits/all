import Link from "next/link";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  title: string;
  category: string;
  resultMetric: string;
  thumbnail: string;
  href: string;
  className?: string;
}

export function PortfolioCard({
  title,
  category,
  resultMetric,
  thumbnail,
  href,
  className,
}: PortfolioCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden rounded-xl border border-border bg-bg-secondary transition-all duration-300",
        "hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-tertiary">
        <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
          {/* Placeholder for image */}
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-tertiary to-bg-secondary">
            <span className="font-heading text-2xl font-bold text-text-secondary/30">
              {title}
            </span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="p-5">
        <span className="mb-2 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">
          {category}
        </span>
        <h3 className="mb-1 font-heading text-lg font-semibold text-text-primary">
          {title}
        </h3>
        <p className="text-sm font-medium text-accent">{resultMetric}</p>
      </div>
    </Link>
  );
}
