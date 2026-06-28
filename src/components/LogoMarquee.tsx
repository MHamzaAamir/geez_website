"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { RefObject } from "react";

const logos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const ITEM_WIDTH = 152; // 150px width + 32px (mx-4 = 16px each side)

function LogoTrack({
  trackRef,
}: {
  trackRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={trackRef} className="absolute flex items-center">
      {logos.map((n) => (
        <div
          key={n}
          className="mx-4 shrink-0 w-30 h-15 flex items-center justify-center"
        >
          <img
            src={`/${n}.png`}
            alt={`Client logo ${n}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const clone = cloneRef.current;
    if (!track || !clone) return;

    const totalWidth = ITEM_WIDTH * logos.length;
    let currentX = 0;
    let rafId: number;

    gsap.set(track, { x: 0 });
    gsap.set(clone, { x: totalWidth });

    const tick = () => {
      currentX -= 0.6;
      if (currentX <= -totalWidth) currentX += totalWidth;
      gsap.set(track, { x: currentX });
      gsap.set(clone, { x: currentX + totalWidth });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="bg-[#3B3C58] min-h-30 w-full max-w-7xl mx-auto rounded-2xl shadow-2xl flex items-center px-6">
      <div className="relative w-full h-15 overflow-hidden">
        <LogoTrack trackRef={trackRef} />
        <LogoTrack trackRef={cloneRef} />
      </div>
    </div>
  );
}
