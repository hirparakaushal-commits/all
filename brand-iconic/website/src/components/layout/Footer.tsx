import Link from "next/link";
import { Linkedin, Instagram, Twitter } from "lucide-react";
import { siteConfig } from "@/lib/constants";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Brand Strategy", href: "/services/brand-strategy" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
  { label: "Content Marketing", href: "/services/content-marketing" },
  { label: "Performance Marketing", href: "/services/performance-marketing" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
  { label: "Instagram", href: siteConfig.social.instagram, icon: Instagram },
  { label: "Twitter", href: siteConfig.social.twitter, icon: Twitter },
];

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl font-heading font-bold text-text-primary">
                Brand <span className="text-accent">Iconic</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-xs">
              India&apos;s premier outcome-based branding partner for D2C brands.
              We help brands break through ceilings with strategic branding and
              performance marketing.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-text-secondary hover:text-accent hover:bg-bg-tertiary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Company */}
          <div>
            <h4 className="text-sm font-heading font-semibold text-text-primary uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-sm font-heading font-semibold text-text-primary uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h4 className="text-sm font-heading font-semibold text-text-primary uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-text-secondary">
            Made with <span className="text-accent">&diams;</span> in Bangalore
          </p>
        </div>
      </div>
    </footer>
  );
}
