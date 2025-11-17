import AppointmentSection from "@/components/appointment-section";
import BestSellersSection from "@/components/best-sellers-section";
import CatalogueSection from "@/components/catalogue-section";
import FeatureSection from "@/components/feature-section";
import HeroCarousel from "@/components/hero-carousel";
import LegacySection from "@/components/legacy-section";
import ProjectsSection from "@/components/our-project-section";
import TestimonialsSection from "@/components/testimony-section";
import WindowTypesSection from "@/components/window-type-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroCarousel />
      <FeatureSection />
      <WindowTypesSection />
      <BestSellersSection />
      <LegacySection />
      <CatalogueSection />
      <ProjectsSection />
      <TestimonialsSection />
      <AppointmentSection />
    </div>
  );
}
