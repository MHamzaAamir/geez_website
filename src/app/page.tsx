import Navbar from "@/components/Navbar";
import CaseStudiesSection from "@/sections/CaseStudiesSection";
import ClientSection from "@/sections/ClientSection";
import FaqSection from "@/sections/FaqSection";
import HeroSection from "@/sections/HeroSection";
import NumbersSection from "@/sections/NumbersSection";
import ServicesSection from "@/sections/ServicesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <NumbersSection />
      <ClientSection />
      {/* <ServicesSection /> */}
      <CaseStudiesSection />
      <FaqSection />
      <div className="h-screen"></div>
    </>
  );
}
