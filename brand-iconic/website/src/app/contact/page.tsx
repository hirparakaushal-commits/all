import type { Metadata } from "next";
import { Mail, Phone, MapPin, Calendar, Linkedin, Instagram, Twitter } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Brand Iconic. Book a free brand audit for your D2C brand. We're based in Bangalore and work with D2C brands across India.",
};

const contactInfo = [
  { icon: <Mail className="h-5 w-5" />, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: <Phone className="h-5 w-5" />, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { icon: <MapPin className="h-5 w-5" />, label: "Office", value: siteConfig.address },
];

const socialLinks = [
  { icon: <Linkedin className="h-5 w-5" />, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: <Instagram className="h-5 w-5" />, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: <Twitter className="h-5 w-5" />, href: siteConfig.social.twitter, label: "X (Twitter)" },
];

const faqs = [
  { q: "What happens after I reach out?", a: "We'll review your submission and get back to you within 24 hours with a brief questionnaire. If we're a good fit, we'll schedule a 30-minute brand audit call — completely free." },
  { q: "How long until I hear back?", a: "We respond to all inquiries within 24 hours on business days. Most responses come within 4-6 hours." },
  { q: "Is the brand audit really free?", a: "Yes, 100% free with no strings attached. We use this call to understand your brand challenges and see if there's a mutual fit before proposing any paid engagement." },
];

export default function ContactPage() {
  return (
    <div className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h1 className="font-heading text-4xl font-bold text-text-primary sm:text-5xl">
            Let&apos;s Build Something{" "}
            <span className="text-accent">Iconic</span> Together
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Ready to transform your D2C brand? Fill out the form and we&apos;ll
            get back to you within 24 hours.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-bg-secondary p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact info */}
            <div className="rounded-xl border border-border bg-bg-secondary p-6">
              <h3 className="mb-4 font-heading text-lg font-semibold text-text-primary">
                Get in Touch
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="mt-0.5 text-accent">{item.icon}</div>
                    <div>
                      <p className="text-xs text-text-secondary">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-text-primary hover:text-accent transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-text-primary">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book a call */}
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="h-5 w-5 text-accent" />
                <h3 className="font-heading text-lg font-semibold text-text-primary">
                  Prefer a Call?
                </h3>
              </div>
              <p className="mb-4 text-sm text-text-secondary">
                Book a free 30-minute brand audit call directly.
              </p>
              <a
                href={siteConfig.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-light"
              >
                Book a Call
              </a>
            </div>

            {/* Social */}
            <div className="rounded-xl border border-border bg-bg-secondary p-6">
              <h3 className="mb-4 font-heading text-lg font-semibold text-text-primary">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-secondary transition-all hover:border-accent/50 hover:text-accent"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-20 max-w-3xl">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-text-primary">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-bg-secondary p-5">
                <h3 className="font-heading text-base font-semibold text-text-primary">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
