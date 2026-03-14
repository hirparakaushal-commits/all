import type { Metadata } from "next";
import { services, getServiceBySlug } from "@/data/services";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { notFound } from "next/navigation";

const slug = "brand-strategy";

export const metadata: Metadata = {
  title: "Brand Strategy & Identity",
  description:
    "Build a D2C brand identity that commands premium pricing and customer loyalty. Strategic positioning, visual identity, and messaging frameworks for Indian D2C brands.",
};

export default function BrandStrategyPage() {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services
    .filter((s) => s.slug !== slug)
    .map((s) => ({ title: s.title, slug: s.slug }));

  return <ServicePageTemplate service={service} relatedServices={related} />;
}
