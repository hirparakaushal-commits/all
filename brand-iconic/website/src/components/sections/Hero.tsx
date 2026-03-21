"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-bg-primary to-bg-primary" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              India&apos;s Premier D2C Branding Agency
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-heading text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your D2C Brand Deserves{" "}
            <span className="text-gradient-gold">More Than a Pretty Logo</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl"
          >
            We help D2C brands break through the ₹50Cr ceiling with strategic
            branding that drives revenue — not just likes.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-bg-primary transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
            >
              Book a Free Brand Audit
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 text-base font-semibold text-text-primary transition-all hover:border-accent/50 hover:text-accent"
            >
              See Our Work
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
