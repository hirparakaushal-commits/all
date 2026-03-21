"use client";

import { motion } from "framer-motion";
import { TrendingUp, Palette, Target } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const problems = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Rising CAC",
    stat: "30% YoY",
    description:
      "Customer acquisition costs are spiraling out of control. Without a strong brand, you're stuck paying more for every customer.",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Creative Fatigue",
    stat: "3-6 months",
    description:
      "Your ads stop working, your content feels stale, and your audience scrolls past. Sound familiar?",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Generic Brand",
    stat: "60-65%",
    description:
      "60-65% of D2C brands are stuck below ₹50Cr because they look like everyone else. A logo isn't a brand.",
  },
];

export function ProblemStatement() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
            The Problem With{" "}
            <span className="text-accent">D2C Branding Today</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Most D2C brands in India are fighting symptoms, not the disease.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={fadeInUp}
              className="rounded-xl border border-border bg-bg-secondary p-6 transition-all hover:border-accent/30"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                {problem.icon}
              </div>
              <div className="mb-2 font-mono text-2xl font-bold text-accent">
                {problem.stat}
              </div>
              <h3 className="mb-2 font-heading text-xl font-semibold text-text-primary">
                {problem.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
