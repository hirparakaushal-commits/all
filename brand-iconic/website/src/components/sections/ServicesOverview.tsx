"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Share2,
  FileText,
  BarChart3,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ServiceCard } from "@/components/cards/ServiceCard";

const serviceItems = [
  {
    title: "Brand Strategy & Identity",
    description:
      "From positioning to visual identity — we build brands that command premium pricing and customer loyalty.",
    icon: <Lightbulb className="h-6 w-6" />,
    href: "/services/brand-strategy",
  },
  {
    title: "Social Media Marketing",
    description:
      "Scroll-stopping content and community building that turns followers into customers and customers into advocates.",
    icon: <Share2 className="h-6 w-6" />,
    href: "/services/social-media-marketing",
  },
  {
    title: "Content Marketing",
    description:
      "SEO-driven content strategy that builds authority, drives organic traffic, and compounds over time.",
    icon: <FileText className="h-6 w-6" />,
    href: "/services/content-marketing",
  },
  {
    title: "Performance Marketing",
    description:
      "Data-driven paid campaigns across Meta, Google, and emerging platforms that maximize ROAS and reduce CAC.",
    icon: <BarChart3 className="h-6 w-6" />,
    href: "/services/performance-marketing",
  },
];

export function ServicesOverview() {
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
            Everything Your D2C Brand Needs to{" "}
            <span className="text-accent">Break Through</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Four integrated services. One strategic partner. Zero guesswork.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {serviceItems.map((service) => (
            <motion.div key={service.title} variants={fadeInUp}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
