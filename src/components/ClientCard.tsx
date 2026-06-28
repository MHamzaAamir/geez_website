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
      className="relative w-86 h-62 bg-red-600 overflow-hidden top-right-bottom-left-clip cursor-pointer"
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
        className="h-[30%] w-[85%] absolute bottom-0 right-0 flex items-center"
      >
        <p className="text-sm text-black leading-none">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
          voluptatum voluptate blanditiis. Eos quod eligendi nam.
        </p>
      </div>
    </div>
  );
}
