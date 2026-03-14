"use client";

import { motion } from "framer-motion";
import { Search, Compass, Rocket, TrendingUp } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Discovery",
    description:
      "Deep-dive into your brand, market, competitors, and audience. We uncover what makes your D2C brand unique.",
  },
  {
    icon: <Compass className="h-6 w-6" />,
    title: "Strategy",
    description:
      "Data-backed brand strategy, positioning, and messaging framework that differentiates you in a crowded market.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Execution",
    description:
      "Visual identity, content, campaigns — we bring the strategy to life across every touchpoint.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Growth",
    description:
      "Ongoing optimization, performance tracking, and strategic pivots to compound your brand's growth.",
  },
];

export function ProcessSteps() {
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
            How We <span className="text-accent">Work</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            A proven 4-step process that eliminates guesswork and delivers
            outcomes.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={fadeInUp}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-10 left-full hidden h-px w-full bg-gradient-to-r from-accent/40 to-transparent lg:block" />
              )}
              <div className="text-center">
                <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-accent/20 bg-accent/5" />
                  <div className="relative text-accent">{step.icon}</div>
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-bg-primary">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
