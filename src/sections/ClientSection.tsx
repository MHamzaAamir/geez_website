import LogoMarquee from "@/components/LogoMarquee";

export default function ClientSection() {
  return (
    <section className="w-screen">
      <div className="flex flex-col bg-[#000123] gap-2 py-4 px-3 sm:px-6 md:px-8">
        {/* First Heading */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-10">
          <div className="h-0.5 bg-[#A036C5] flex-1" />
          <h1 className="text-base sm:text-xl md:text-2xl whitespace-normal sm:whitespace-nowrap text-center leading-tight">
            LOYAL CLIENTS ACROSS THE WORLD
          </h1>
          <div className="h-0.5 bg-[#A036C5] flex-1" />
        </div>

        <LogoMarquee />

        {/* Second Heading */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-12">
          <div className="h-0.5 bg-[#A036C5] flex-1" />
          <h1 className="text-base sm:text-xl md:text-2xl whitespace-normal sm:whitespace-nowrap text-center leading-tight">
            TRUSTING OUR CREATIVITY
          </h1>
          <div className="h-0.5 bg-[#A036C5] flex-1" />
        </div>
      </div>
    </section>
  );
}
