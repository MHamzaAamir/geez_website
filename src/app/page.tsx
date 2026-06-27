import Navbar from "@/components/Navbar";
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
      {/* <ServicesSection /> */}
      <FaqSection />
      <div className="h-screen"></div>
    </>
  );
}
