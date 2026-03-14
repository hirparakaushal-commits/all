"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { TestimonialCard } from "@/components/cards/TestimonialCard";

const testimonials = [
  {
    quote:
      "Brand Iconic didn't just redesign our packaging — they repositioned our entire brand. Revenue jumped 3.2x in 8 months. Best investment we've made.",
    author: "Arjun Mehta",
    role: "Founder",
    company: "FreshBrew",
  },
  {
    quote:
      "We'd been through 3 agencies before Brand Iconic. They're the first team that actually understood D2C unit economics and designed our brand strategy around it.",
    author: "Priya Sharma",
    role: "Co-Founder",
    company: "GlowNaturals",
  },
  {
    quote:
      "Our CAC dropped 45% after Brand Iconic revamped our social presence. They don't just make things pretty — they make things work.",
    author: "Vikram Patel",
    role: "CEO",
    company: "UrbanFit",
  },
];

export function Testimonials() {
  return (
    <section className="bg-bg-secondary/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
            What Founders <span className="text-accent">Say About Us</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Don&apos;t take our word for it. Hear from D2C founders who&apos;ve
            seen the results.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.author} variants={fadeInUp}>
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
