export default function DisruptPatternSection() {
  return (
    <section className="relative z-10 min-h-screen w-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/disrupt.webm" type="video/webm" />
      </video>

      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        <defs>
          <mask id="disrupt-cutout-mask">
            <rect width="1440" height="900" fill="white" />
            <text
              x="50%"
              y="38%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-bebas-neue)"
              fontWeight={500}
              fontSize="200"
              fill="black"
            >
              DISRUPT THE
            </text>
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-bebas-neue)"
              fontWeight={500}
              fontSize="295"
              fill="black"
            >
              PATTERN
            </text>
            <text
              x="50%"
              y="76%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-bebas-neue)"
              fontWeight={400}
              fontSize="40"
              fill="black"
            >
              WITH OUR SCROLL STOPPING VISUALS & CREATIVE STORYTELLING
            </text>
          </mask>
        </defs>
        <rect
          width="1440"
          height="900"
          fill="#000123"
          mask="url(#disrupt-cutout-mask)"
        />
      </svg>
    </section>
  );
}
