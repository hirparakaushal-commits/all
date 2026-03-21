import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  className?: string;
}

export function TeamCard({
  name,
  role,
  bio,
  className,
}: TeamCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-secondary p-6 text-center transition-all duration-300",
        "hover:border-accent/30",
        className
      )}
    >
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-bg-tertiary">
        <User className="h-10 w-10 text-text-secondary" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-text-primary">
        {name}
      </h3>
      <p className="mb-2 text-sm font-medium text-accent">{role}</p>
      <p className="text-sm leading-relaxed text-text-secondary">{bio}</p>
    </div>
  );
}
