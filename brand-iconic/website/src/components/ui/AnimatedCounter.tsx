"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  duration?: number;
}

function AnimatedCounter({
  value,
  suffix = "",
  label,
  className,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="font-mono text-4xl font-bold text-accent sm:text-5xl lg:text-6xl">
        {displayValue.toLocaleString()}
        {suffix && <span className="text-accent-light">{suffix}</span>}
      </div>
      <p className="mt-2 text-sm text-text-secondary sm:text-base">{label}</p>
    </div>
  );
}

export { AnimatedCounter };
export type { AnimatedCounterProps };
