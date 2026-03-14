import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  href,
  className,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-xl border border-border bg-bg-secondary p-6 transition-all duration-300",
        "hover:border-accent/40 hover:bg-bg-tertiary hover:shadow-lg hover:shadow-accent/5",
        className
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
        {icon}
      </div>
      <h3 className="mb-2 font-heading text-xl font-semibold text-text-primary">
        {title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:gap-2">
        Learn More <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
