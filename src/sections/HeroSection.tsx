export default function HeroSection() {
  return (
    <>
      <section className="relative h-screen w-screen overflow-hidden">
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
        <div className="section-container relative z-10 flex h-full items-center">
          <div className="text-white">
            <h1 className="text-6xl font-bold">ALL-IN-1 CREATIVE STUDIO</h1>
            <h2 className="text-[39.4px] font-bold">
              ANIMATION, GAME DESIGN, MARKETING
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
