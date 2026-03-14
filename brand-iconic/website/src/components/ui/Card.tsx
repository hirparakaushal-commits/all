import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

function Card({ hoverable = true, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-secondary p-6",
        hoverable &&
          "transition-all duration-300 hover:border-accent-dark hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card };
export type { CardProps };
