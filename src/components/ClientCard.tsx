"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ClientCardProps } from "@/types/CaseStudiesSectionTypes";

export default function ClientCard({ image, text }: ClientCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const yellow = yellowRef.current;
    const text = textRef.current;

    if (!card || !yellow || !text) return;

    gsap.set(text, {
      opacity: 0,
      y: 20,
    });

    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(yellow, {
        y: "55%",
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        text,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        "-=0.1",
      );

    const handleEnter = () => {
      tl.current?.play();
    };

    const handleLeave = () => {
      tl.current?.reverse();
    };

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mouseenter", handleEnter);
      card.removeEventListener("mouseleave", handleLeave);
      tl.current?.kill();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative h-56 w-full max-w-86 overflow-hidden bg-red-600 top-right-bottom-left-clip cursor-pointer sm:h-62"
    >
      <Image
        src="/hero-poster.jpg"
        fill
        alt="Card Image"
        className="object-cover"
      />
      <div
        ref={yellowRef}
        className="absolute inset-0 bg-[#FFE102] translate-y-full clip-shape-top-right"
      />
      <div
        ref={textRef}
        className="absolute right-0 bottom-0 flex h-[34%] w-[88%] items-center px-3 sm:h-[30%] sm:w-[85%]"
      >
        <p className="text-xs leading-tight text-black sm:text-sm sm:leading-none">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
          voluptatum voluptate blanditiis. Eos quod eligendi nam.
        </p>
      </div>
    </div>
  );
}
