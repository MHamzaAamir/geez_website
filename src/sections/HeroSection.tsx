import Link from "next/link";

export default function HeroSection() {
  const CALENDLY_LINK =
    process.env.CALENDLY_LINK ??
    "https://calendly.com/ghufran-geezcreationz/30min";
  const SHOW_REEL_LINK =
    process.env.SHOW_REEL_LINK ?? "https://www.youtube.com/watch?v=a0wMh-TCjYE";

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="section-container relative z-10 flex min-h-screen flex-col px-4 py-8 sm:px-6 sm:py-10 md:py-12">
          <div className="flex flex-1 items-center justify-start text-left">
            <div className="w-full max-w-5xl text-white">
              <h1 className="text-3xl leading-tight font-bold sm:text-5xl md:text-6xl">
                ALL-IN-1 CREATIVE STUDIO
              </h1>
              <h2 className="mt-2 text-lg leading-tight font-bold sm:text-3xl md:mt-3 md:text-[39.4px]">
                ANIMATION, GAME DESIGN, MARKETING
              </h2>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 pb-2 sm:flex-row sm:justify-between sm:gap-4 sm:pb-4">
            <Link
              href={SHOW_REEL_LINK}
              target="_blank"
              className="top-right-bottom-left-clip-hero w-full bg-[#A036C5] px-8 py-4 text-center text-lg font-semibold tracking-wide text-white sm:w-auto sm:min-w-55 sm:px-10 sm:text-xl md:min-w-80 md:px-12 md:py-4 md:text-2xl lg:min-w-96"
            >
              WATCH SHOW REEL
            </Link>
            <Link
              href={CALENDLY_LINK}
              target="_blank"
              className="top-right-bottom-left-clip-hero w-full bg-[#FFE500] px-8 py-4 text-center text-lg font-semibold tracking-wide text-black sm:w-auto sm:min-w-55 sm:px-10 sm:text-xl md:min-w-80 md:px-12 md:py-4 md:text-2xl lg:min-w-96"
            >
              DISCUSS YOUR PROJECT
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
