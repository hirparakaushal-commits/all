import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ProblemStatement } from "@/components/sections/ProblemStatement";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <ProblemStatement />
      <ServicesOverview />
      <FeaturedWork />
      <StatsCounter />
      <ProcessSteps />
      <Testimonials />
      <CTASection />
    </>
  );
}
