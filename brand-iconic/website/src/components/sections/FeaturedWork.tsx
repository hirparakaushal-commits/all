"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { PortfolioCard } from "@/components/cards/PortfolioCard";

const featuredProjects = [
  {
    title: "FreshBrew",
    category: "Brand Identity",
    resultMetric: "3.2x Revenue Growth",
    thumbnail: "/images/portfolio/freshbrew.jpg",
    href: "/portfolio/freshbrew",
  },
  {
    title: "GlowNaturals",
    category: "Social Media",
    resultMetric: "45% CAC Reduction",
    thumbnail: "/images/portfolio/glownaturals.jpg",
    href: "/portfolio/glownaturals",
  },
  {
    title: "UrbanFit",
    category: "Full Service",
    resultMetric: "₹12Cr Revenue in 18 Months",
    thumbnail: "/images/portfolio/urbanfit.jpg",
    href: "/portfolio/urbanfit",
  },
];

export function FeaturedWork() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <div>
            <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Work That <span className="text-accent">Speaks Louder</span>
            </h2>
            <p className="mt-2 text-text-secondary">
              Real results for real D2C brands.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            View All Work <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.title} variants={fadeInUp}>
              <PortfolioCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
