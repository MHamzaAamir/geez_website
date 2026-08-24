"use client";

import { useLayoutEffect, useRef, useState } from "react";

const VIEWBOX_WIDTH = 1440;
const VIEWBOX_HEIGHT = 900;

export default function DisruptPatternSection() {
  const svgRef = useRef<SVGSVGElement>(null);
  const textGroupRef = useRef<SVGGElement>(null);
  const [textScale, setTextScale] = useState(1);

  useLayoutEffect(() => {
    let frame = 0;

    const measure = () => {
      const svg = svgRef.current;
      const group = textGroupRef.current;
      if (!svg || !group) return;

      const rect = svg.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const sliceScale = Math.max(
        rect.width / VIEWBOX_WIDTH,
        rect.height / VIEWBOX_HEIGHT,
      );

      let widest = 0;
      for (const text of group.querySelectorAll("text")) {
        try {
          const length = (
            text as SVGTextContentElement
          ).getComputedTextLength();
          if (Number.isFinite(length)) widest = Math.max(widest, length);
        } catch {
          // measurement not available; ignore
        }
      }
      if (widest <= 0) return;

      const renderedWidth = widest * sliceScale;
      const scale = Math.min(1, (rect.width * 0.9) / renderedWidth);
      setTextScale(scale);
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);

    const reMeasureOnFontsReady = () => {
      document.fonts?.ready.then(() => schedule());
    };
    reMeasureOnFontsReady();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
    };
  }, []);

  return (
    <section className="relative z-10 min-h-screen w-full overflow-hidden">
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
        ref={svgRef}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        <defs>
          <mask id="disrupt-cutout-mask">
            <rect width="1440" height="900" fill="white" />
            <g
              ref={textGroupRef}
              style={{
                transform: `scale(${textScale})`,
                transformOrigin: "center",
                transformBox: "view-box",
              }}
            >
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
            </g>
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
