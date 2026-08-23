"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ClientCard from "@/components/ClientCard";
import { ClientCardProps } from "@/types/CaseStudiesSectionTypes";

export default function CaseStudiesMarquee({
  cards,
}: {
  cards: ClientCardProps[];
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const setWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartTrackXRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const set = setRef.current;
    if (!viewport || !track || !set) return;

    const createTween = () => {
      tweenRef.current?.kill();
      const w = set.offsetWidth;
      setWidthRef.current = w;
      tweenRef.current = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -w,
          duration: w / 60,
          ease: "none",
          repeat: -1,
        },
      );
      return tweenRef.current;
    };

    createTween();

    const handleEnter = () => {
      isHoveredRef.current = true;
      tweenRef.current?.pause();
    };

    const handleLeave = () => {
      isHoveredRef.current = false;
      if (!isDraggingRef.current) tweenRef.current?.play();
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      tweenRef.current?.pause();
      dragStartXRef.current = e.clientX;
      dragStartTrackXRef.current = gsap.getProperty(track, "x") as number;
      viewport.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartXRef.current;
      const w = setWidthRef.current;
      let newX = dragStartTrackXRef.current + dx;
      newX = (((newX % w) + w) % w) - w;
      gsap.set(track, { x: newX });
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      const w = setWidthRef.current;
      const currentX = gsap.getProperty(track, "x") as number;
      tweenRef.current?.progress(-currentX / w);
      if (!isHoveredRef.current) tweenRef.current?.play();
      if (viewport.hasPointerCapture(e.pointerId)) {
        viewport.releasePointerCapture(e.pointerId);
      }
    };

    const handleResize = () => {
      const w = set.offsetWidth;
      if (w === setWidthRef.current) return;
      setWidthRef.current = w;
      createTween();
    };

    viewport.addEventListener("mouseenter", handleEnter);
    viewport.addEventListener("mouseleave", handleLeave);
    viewport.addEventListener("pointerdown", handlePointerDown);
    viewport.addEventListener("pointermove", handlePointerMove);
    viewport.addEventListener("pointerup", handlePointerUp);
    viewport.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("resize", handleResize);

    return () => {
      viewport.removeEventListener("mouseenter", handleEnter);
      viewport.removeEventListener("mouseleave", handleLeave);
      viewport.removeEventListener("pointerdown", handlePointerDown);
      viewport.removeEventListener("pointermove", handlePointerMove);
      viewport.removeEventListener("pointerup", handlePointerUp);
      viewport.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("resize", handleResize);
      tweenRef.current?.kill();
    };
  }, []);

  const renderSet = (isClone: boolean) => (
    <div
      ref={isClone ? undefined : setRef}
      aria-hidden={isClone || undefined}
      className="flex gap-6 pr-6 sm:gap-8 sm:pr-8 md:gap-12 md:pr-12"
    >
      {cards.map((card) => (
        <div key={card.title} className="w-[300px] shrink-0 sm:w-[340px]">
          <ClientCard text={card.text} image={card.image} title={card.title} />
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={viewportRef}
      className="mt-8 cursor-grab overflow-hidden py-2 select-none active:cursor-grabbing [&_img]:pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      style={{ touchAction: "pan-y" }}
    >
      <div ref={trackRef} className="flex will-change-transform">
        {renderSet(false)}
        {renderSet(true)}
      </div>
    </div>
  );
}
