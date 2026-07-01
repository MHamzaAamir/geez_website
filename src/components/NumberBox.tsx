"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NumberBoxProps } from "@/types/NumberSectionTypes";

gsap.registerPlugin(ScrollTrigger);

export default function NumberBox({
  figure,
  symbol = "",
  text,
}: NumberBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const figureElement = figureRef.current;

    if (!box || !figureElement) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const counter = { value: 0 };

    const tween = gsap.to(counter, {
      value: figure,
      duration: prefersReducedMotion ? 0 : 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: box,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        figureElement.textContent = `${Math.round(counter.value)}${symbol}`;
      },
      onComplete: () => {
        figureElement.textContent = `${figure}${symbol}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [figure, symbol]);

  return (
    <div ref={boxRef}>
      <div
        ref={figureRef}
        className="text-[70px] sm:text-[100px] lg:text-[150px] leading-none -mb-3 font-bebas-neue"
      >
        0{symbol}
      </div>
      <div
        className="pl-1 leading-none font-light"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
