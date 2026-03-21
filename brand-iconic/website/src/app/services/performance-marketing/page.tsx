import type { Metadata } from "next";
import { services, getServiceBySlug } from "@/data/services";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { notFound } from "next/navigation";

const slug = "performance-marketing";

export const metadata: Metadata = {
  title: "Performance Marketing & Paid Ads",
  description:
    "Performance marketing for D2C brands in India. Data-driven Meta & Google ad campaigns that maximize ROAS and systematically reduce CAC.",
};

export default function PerformanceMarketingPage() {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services
    .filter((s) => s.slug !== slug)
    .map((s) => ({ title: s.title, slug: s.slug }));

  return <ServicePageTemplate service={service} relatedServices={related} />;
}
