"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Service } from "@/types";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-heading text-base font-semibold text-text-primary pr-4">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-accent transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-4 text-sm leading-relaxed text-text-secondary">
          {answer}
        </div>
      )}
    </div>
  );
}

export function ServicePageTemplate({ service, relatedServices }: { service: Service; relatedServices: { title: string; slug: string }[] }) {
  return (
    <div className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-heading text-4xl font-bold text-text-primary sm:text-5xl"
          >
            {service.title}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg leading-relaxed text-text-secondary"
          >
            {service.heroDescription}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 font-semibold text-bg-primary transition-all hover:bg-accent-light"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* The Problem */}
        <div className="mb-20">
          <h2 className="mb-6 font-heading text-2xl font-bold text-text-primary">
            {service.problem.title}
          </h2>
          <p className="mb-6 text-text-secondary leading-relaxed">
            {service.problem.description}
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.problem.painPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 rounded-lg border border-border bg-bg-secondary p-4 text-sm text-text-primary"
              >
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Our Approach */}
        <div className="mb-20">
          <h2 className="mb-8 font-heading text-2xl font-bold text-text-primary">
            {service.approach.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.approach.steps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-xl border border-border bg-bg-secondary p-6"
              >
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-bg-primary">
                  {i + 1}
                </span>
                <h3 className="mb-2 font-heading text-lg font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-20">
          <h2 className="mb-6 font-heading text-2xl font-bold text-text-primary">
            What You Get
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-border bg-bg-secondary p-4"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span className="text-sm text-text-primary">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-20 rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
          <p className="text-sm uppercase tracking-wider text-accent">Results</p>
          <p className="mt-2 font-mono text-4xl font-bold text-accent">
            {service.results.value}
          </p>
          <p className="mt-1 font-heading text-lg font-semibold text-text-primary">
            {service.results.metric}
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            {service.results.description}
          </p>
        </div>

        {/* FAQ */}
        <div className="mb-20 mx-auto max-w-3xl">
          <h2 className="mb-6 font-heading text-2xl font-bold text-text-primary">
            Frequently Asked Questions
          </h2>
          <div className="rounded-xl border border-border bg-bg-secondary p-6">
            {service.faqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>

        {/* Related Services */}
        <div className="mb-20">
          <h2 className="mb-6 font-heading text-2xl font-bold text-text-primary">
            Related Services
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedServices.map((rs) => (
              <Link
                key={rs.slug}
                href={`/services/${rs.slug}`}
                className="group rounded-xl border border-border bg-bg-secondary p-5 transition-all hover:border-accent/40"
              >
                <h3 className="font-heading text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {rs.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-accent">
                  Learn More <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-border bg-gradient-to-br from-bg-secondary to-accent/5 p-8 text-center lg:p-12">
          <h2 className="font-heading text-3xl font-bold text-text-primary">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-text-secondary">
            Book a free consultation and let&apos;s discuss how {service.shortTitle} can
            transform your D2C brand.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 font-semibold text-bg-primary transition-all hover:bg-accent-light"
          >
            Book a Free Consultation <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
