"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CTASection({
  title = "Ready to Build a Brand That Commands Premium?",
  subtitle = "Book a free brand audit and discover what's holding your D2C brand back.",
  ctaText = "Book a Free Brand Audit",
  ctaHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-bg-secondary via-bg-secondary to-accent/5 px-6 py-16 text-center sm:px-12 lg:py-20"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            {subtitle}
          </p>
          <Link
            href={ctaHref}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-bg-primary transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
          >
            {ctaText}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
