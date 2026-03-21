import type { NavLink } from "@/types";

export const navigation: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Brand Strategy", href: "/services/brand-strategy" },
      {
        label: "Social Media Marketing",
        href: "/services/social-media-marketing",
      },
      { label: "Content Marketing", href: "/services/content-marketing" },
      {
        label: "Performance Marketing",
        href: "/services/performance-marketing",
      },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];
