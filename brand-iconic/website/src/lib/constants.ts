export const siteConfig = {
  name: "Brand Iconic",
  description:
    "India's premier outcome-based branding partner for D2C brands. We help D2C brands break through the ₹50Cr ceiling with strategic branding, social media, content, and performance marketing.",
  url: "https://brandikonic.com",
  ogImage: "/images/og-image.jpg",
  email: "hello@brandikonic.com",
  phone: "+91 98765 43210",
  address: "Bangalore, Karnataka, India",
  social: {
    linkedin: "https://linkedin.com/company/brandikonic",
    instagram: "https://instagram.com/brandikonic",
    twitter: "https://x.com/brandikonic",
  },
  calendly: "https://calendly.com/brandikonic/brand-audit",
} as const;

export const stats = [
  { label: "Brands Transformed", value: 50, suffix: "+" },
  { label: "Avg Revenue Lift", value: 40, suffix: "%" },
  { label: "Years Experience", value: 8, suffix: "+" },
  { label: "Revenue Generated", value: 100, suffix: "Cr+" },
] as const;
