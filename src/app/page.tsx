import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="h-screen bg-black"></div>
    </>
  );
}
