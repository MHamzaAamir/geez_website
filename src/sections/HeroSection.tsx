export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen w-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero-video.webm" type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="section-container relative z-10 flex min-h-screen items-center py-20 md:py-24">
          <div className="max-w-88 text-white sm:max-w-2xl md:max-w-3xl lg:max-w-none">
            <h1 className="text-4xl leading-tight font-bold sm:text-5xl md:text-6xl">
              ALL-IN-1 CREATIVE STUDIO
            </h1>
            <h2 className="mt-2 text-xl leading-tight font-bold sm:text-3xl md:mt-3 md:text-[39.4px]">
              ANIMATION, GAME DESIGN, MARKETING
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
