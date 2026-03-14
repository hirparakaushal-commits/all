import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "border border-border text-text-secondary",
  accent: "bg-accent/10 text-accent border border-accent/20",
} as const;

type BadgeVariant = keyof typeof badgeVariants;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
export type { BadgeProps, BadgeVariant };
