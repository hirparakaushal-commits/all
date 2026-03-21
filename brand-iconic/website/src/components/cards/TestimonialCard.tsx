import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-secondary p-6 transition-all duration-300",
        "hover:border-accent/30",
        className
      )}
    >
      <Quote className="mb-4 h-8 w-8 text-accent/60" />
      <p className="mb-6 text-sm leading-relaxed text-text-secondary italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <p className="font-heading text-sm font-semibold text-text-primary">
          {author}
        </p>
        <p className="text-xs text-text-secondary">
          {role}, {company}
        </p>
      </div>
    </div>
  );
}
