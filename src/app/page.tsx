import Navbar from "@/components/Navbar";
import BookingSection from "@/sections/BookingSection";
import CaseStudiesSection from "@/sections/CaseStudiesSection";
import DisruptPatternSection from "@/sections/DisruptPatternSection";
import SpacerSection from "@/sections/SpacerSection";
import ClientSection from "@/sections/ClientSection";
import FaqSection from "@/sections/FaqSection";
import FooterSection from "@/sections/FooterSection";
import HeroSection from "@/sections/HeroSection";
import NumbersSection from "@/sections/NumbersSection";
import ServicesSection from "@/sections/ServicesSection";
import VideoBackground from "@/sections/VideoBackground";

export default function Home() {
  return (
    <>
      <VideoBackground />
      <Navbar />
      <HeroSection />
      <NumbersSection />
      <ClientSection />
      <ServicesSection />
      <CaseStudiesSection />
      <DisruptPatternSection />
      <FaqSection />
      <BookingSection />
      <SpacerSection />
      <FooterSection />
    </>
  );
}
