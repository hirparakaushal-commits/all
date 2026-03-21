import type { Metadata } from "next";
import { services, getServiceBySlug } from "@/data/services";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { notFound } from "next/navigation";

const slug = "content-marketing";

export const metadata: Metadata = {
  title: "Content Marketing",
  description:
    "SEO-driven content marketing for D2C brands. Build thought leadership, drive organic traffic, and compound returns with strategic content.",
};

export default function ContentMarketingPage() {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services
    .filter((s) => s.slug !== slug)
    .map((s) => ({ title: s.title, slug: s.slug }));

  return <ServicePageTemplate service={service} relatedServices={related} />;
}
