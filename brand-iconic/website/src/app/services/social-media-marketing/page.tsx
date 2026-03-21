import type { Metadata } from "next";
import { services, getServiceBySlug } from "@/data/services";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { notFound } from "next/navigation";

const slug = "social-media-marketing";

export const metadata: Metadata = {
  title: "Social Media Marketing",
  description:
    "Social media marketing for D2C brands in India. Scroll-stopping content, community building, and data-driven strategies that drive real revenue.",
};

export default function SocialMediaPage() {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services
    .filter((s) => s.slug !== slug)
    .map((s) => ({ title: s.title, slug: s.slug }));

  return <ServicePageTemplate service={service} relatedServices={related} />;
}
