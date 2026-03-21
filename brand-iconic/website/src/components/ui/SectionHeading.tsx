import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      <div
        className={cn(
          "mb-4 h-1 w-12 rounded-full bg-accent",
          centered && "mx-auto"
        )}
      />
      <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-text-secondary sm:text-xl lg:text-2xl"
          style={centered ? { marginInline: "auto" } : undefined}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export { SectionHeading };
export type { SectionHeadingProps };
