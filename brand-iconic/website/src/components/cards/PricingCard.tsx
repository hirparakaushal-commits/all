import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: string;
  target: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  className?: string;
}

export function PricingCard({
  name,
  price,
  target,
  description,
  features,
  highlighted = false,
  cta,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border p-6 transition-all duration-300 lg:p-8",
        highlighted
          ? "border-accent bg-bg-secondary shadow-lg shadow-accent/10 scale-[1.02]"
          : "border-border bg-bg-secondary hover:border-accent/30",
        className
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-bg-primary">
          Most Popular
        </span>
      )}
      <h3 className="font-heading text-xl font-bold text-text-primary">
        {name}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">{target}</p>
      <div className="my-4">
        <span className="font-heading text-3xl font-bold text-accent">
          {price}
        </span>
        <span className="text-sm text-text-secondary">/month</span>
      </div>
      <p className="mb-6 text-sm text-text-secondary">{description}</p>
      <ul className="mb-8 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span className="text-text-primary">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className={cn(
          "block w-full rounded-lg py-3 text-center text-sm font-semibold transition-all",
          highlighted
            ? "bg-accent text-bg-primary hover:bg-accent-light"
            : "border border-accent text-accent hover:bg-accent hover:text-bg-primary"
        )}
      >
        {cta}
      </Link>
    </div>
  );
}
