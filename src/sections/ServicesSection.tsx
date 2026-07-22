"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const listViewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const imagePanel = imagePanelRef.current;

    if (!imagePanel) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        imagePanel,
        { xPercent: -18, autoAlpha: 0 },
        {
          xPercent: 0,
          autoAlpha: 1,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imagePanel,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const listViewport = listViewportRef.current;
    const list = listRef.current;

    if (!section || !listViewport || !list) {
      return;
    }

    if (windowWidth < 768) {
      return;
    }

    const context = gsap.context(() => {
      const getScrollDistance = () =>
        Math.max(0, list.scrollHeight - listViewport.clientHeight);
      const pinDistanceMultiplier = 0.4;

      gsap.set(list, { y: 0 });

      gsap.to(list, {
        y: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            `+=${
              Math.max(
                window.innerHeight,
                getScrollDistance() + window.innerHeight * 1.5,
              ) * pinDistanceMultiplier
            }`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, [windowWidth]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#000123] text-white z-10"
    >
      <div className="flex min-h-screen flex-col gap-10 py-14 md:grid md:min-h-screen md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-stretch md:gap-12 md:py-0">
        <div
          ref={imagePanelRef}
          className="relative aspect-1231/1000 w-full overflow-hidden md:aspect-auto md:min-h-screen"
        >
          <Image
            src="/bubzi_skateboard.png"
            fill
            sizes="(min-width: 768px) 56vw, 100vw"
            alt="Bubzi Skateboard"
            className="object-cover object-left"
            priority
          />
        </div>

        <div className="flex min-h-0 flex-col px-4 sm:px-6 md:h-screen md:justify-center md:px-8 md:py-12 lg:px-10 xl:px-14">
          <div className="shrink-0 px-0">
            <h1 className="text-5xl leading-none font-bold sm:text-6xl md:text-7xl">
              EXPLORE OUR
            </h1>
            <h1 className="text-6xl leading-none font-bold sm:text-7xl md:text-[5.75rem]">
              SERVICES
            </h1>
          </div>

          <div
            ref={listViewportRef}
            className="min-h-0 flex-1 overflow-visible pt-8 md:h-[52vh] md:flex-none md:overflow-hidden md:pt-10 lg:h-[58vh]"
          >
            <div
              ref={listRef}
              className="space-y-8 pb-16 md:space-y-10 md:pb-24 lg:pb-32"
            >
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
  );
}
