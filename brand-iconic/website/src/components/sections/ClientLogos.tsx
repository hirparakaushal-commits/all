"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const clients = [
  "FreshBrew",
  "GlowNaturals",
  "UrbanFit",
  "SpiceBox",
  "PureLeaf",
  "NestCraft",
  "VitaBlend",
  "DesiThreads",
];

export function ClientLogos() {
  return (
    <section className="border-y border-border bg-bg-secondary/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-text-secondary"
        >
          Trusted by D2C brands across India
        </motion.p>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-12">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`${client}-${i}`}
                className="flex shrink-0 items-center justify-center px-4 grayscale transition-all hover:grayscale-0"
              >
                <span className="font-heading text-xl font-bold text-text-secondary/40 hover:text-accent transition-colors whitespace-nowrap">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
