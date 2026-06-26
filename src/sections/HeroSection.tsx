export default function HeroSection() {
  return (
    <>
      <section className="relative h-screen overflow-hidden">
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
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto max-w-7xl px-6">
            <h1 className="text-6xl font-bold text-white">
              Build Amazing Products
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/90">
              Beautiful websites powered by AI.
            </p>

            <button className="mt-8 rounded-lg bg-white px-6 py-3 text-black font-semibold">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
