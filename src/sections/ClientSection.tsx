import LogoMarquee from "@/components/LogoMarquee";

export default function ClientSection() {
  return (
    <section className="w-screen">
      <div className="flex flex-col bg-[#000123] gap-2 py-4">
        {/* First Heading */}
        <div className="flex items-center gap-10">
          <div className="h-0.5 bg-[#A036C5] flex-1" />
          <h1 className="text-2xl whitespace-nowrap">
            LOYAL CLIENTS ACROSS THE WORLD
          </h1>
          <div className="h-0.5 bg-[#A036C5] flex-1" />
        </div>

        <LogoMarquee />

        {/* Second Heading */}
        <div className="flex items-center gap-12">
          <div className="h-0.5 bg-[#A036C5] flex-1" />
          <h1 className="text-2xl whitespace-nowrap">
            TRUSTING OUR CREATIVITY
          </h1>
          <div className="h-0.5 bg-[#A036C5] flex-1" />
        </div>
      </div>
    </section>
  );
}
