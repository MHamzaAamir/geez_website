"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ClientCardProps } from "@/types/CaseStudiesSectionTypes";

export default function ClientCard({ image, text, title }: ClientCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const yellow = yellowRef.current;
    const text = textRef.current;
    const title = titleRef.current;
    const dark = darkRef.current;

    if (!card || !yellow || !text || !title || !dark) return;

    gsap.set(text, {
      opacity: 0,
      y: 20,
    });

    gsap.set(title, {
      opacity: 0,
      y: 12,
    });

    gsap.set(dark, {
      opacity: 0,
    });

    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(dark, {
        opacity: 0.55,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        yellow,
        {
          y: "55%",
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        text,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        "-=0.1",
      )
      .to(
        title,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        "<",
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
      className="relative h-56 w-full max-w-86 overflow-hidden top-right-bottom-left-clip cursor-pointer sm:h-62"
    >
      <Image
        src={image}
        fill
        alt="Card Image"
        className="object-cover"
        sizes="(max-width: 344px) 100vw, 344px"
      />
      <div ref={darkRef} className="absolute inset-0 bg-black" />
      <div
        ref={titleRef}
        className="absolute top-[50%] right-0 flex justify-center px-4"
      >
        <p className="font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] text-5xl tracking-tight">
          {title}
        </p>
      </div>
      <div
        ref={yellowRef}
        className="absolute inset-0 bg-[#FFE102] translate-y-full clip-shape-top-right"
      />
      <div
        ref={textRef}
        className="absolute right-0 bottom-0 flex h-[34%] w-[88%] items-center px-3 sm:h-[30%] sm:w-[85%]"
      >
        <p className="text-xs leading-tight text-black sm:text-sm sm:leading-none">
          {text}
        </p>
      </div>
    </div>
  );
}
