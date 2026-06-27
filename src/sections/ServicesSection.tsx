"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceItem from "@/components/ServiceItem";
import { ServiceItemProps } from "@/types/ServicesSectionTypes";

gsap.registerPlugin(ScrollTrigger);

const services: ServiceItemProps[] = [
  {
    heading: "ANIMATION & VIDEO PRODUCTION",
    description:
      "PRODUCE AN ANIMATED OR LIVE ACTION (OR A HYBRID) VIDEO FOR YOUR BRAND. FROM CREATING A SCRIPT TO POST-PRODUCTION AND PUBLISHING. OUR TEAM WILL HANDLE IT ALL.",
  },
  {
    heading: "GAME DESIGN & DEVELOPMENT",
    description:
      "BUILD INTERACTIVE EXPERIENCES THAT FEEL SHARP, PLAYABLE, AND TRUE TO YOUR BRAND FROM CONCEPT TO FINAL DELIVERY.",
  },
  {
    heading: "BRANDING & VISUAL IDENTITY",
    description:
      "CREATE A STRONG PRESENCE AND GAIN TRUST OF YOUR AUDIENCE WITH THE HELP OF OUR EXPERT DESIGNERS. LET YOUR VISUALS SELL.",
  },
  {
    heading: "TEAM AUGMENTATION",
    description:
      "INTEGRATE YOUR TEAM WITH OUR SKILLED CREATIVES AND STRATEGISTS.",
  },
  {
    heading: "AI INTEGRATION & SOLUTIONS",
    description:
      "ACCELERATE YOUR GROWTH DREAM WITH GENERATIVE AI SOLUTIONS AND INTEGRATE IT INTO YOUR WORKFLOW.",
  },
  {
    heading: "WEB DEVELOPMENT & UI/UX DESIGN",
    description:
      "CREATE INTERACTIVE AND HIGH CONVERSION WEBISTES WHICH DONT JUST LOOK PRETTY BUT ACTUALLY CONVERT",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listViewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const listViewport = listViewportRef.current;
    const list = listRef.current;

    if (!section || !listViewport || !list) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      listViewport.style.overflowY = "auto";
      return;
    }

    const context = gsap.context(() => {
      const getScrollDistance = () =>
        Math.max(0, list.scrollHeight - listViewport.clientHeight);

      gsap.to(list, {
        y: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight, getScrollDistance())}`,
          scrub: true,
          pin: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-screen bg-[#000123] text-white overflow-hidden"
      >
        <div className="flex h-full w-full flex-row">
          <div className="w-full md:h-screen md:w-1/2">
            <Image
              src={"/bubzi_skateboard.webp"}
              width={1200}
              height={1200}
              alt="Bubzi Skateboard"
              className="h-full w-full object-contain md:object-cover"
            />
          </div>
          <div className="flex w-full flex-col px-6 py-12 md:h-screen md:w-1/2 md:px-0 md:pt-22 md:pb-0">
            <div className="shrink-0">
              <h1 className="text-5xl leading-none font-bold">EXPLORE OUR</h1>
              <h1 className="text-7xl leading-none font-bold">SERVICES</h1>
            </div>
            <div
              ref={listViewportRef}
              className="min-h-0 flex-1 overflow-visible md:overflow-hidden"
            >
              <div ref={listRef} className="pb-12 md:pb-[45vh]">
                {services.map((service) => (
                  <ServiceItem
                    key={service.heading}
                    heading={service.heading}
                    description={service.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
