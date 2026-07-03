import Navbar from "@/components/Navbar";
import CaseStudiesSection from "@/sections/CaseStudiesSection";
import ClientSection from "@/sections/ClientSection";
import FaqSection from "@/sections/FaqSection";
import FooterSection from "@/sections/FooterSection";
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
      <div className="h-screen bg-linear-to-b from-[#000123] to-[#782995]"></div>
      <FooterSection />
    </>
  );
}
