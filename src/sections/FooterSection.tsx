"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Case Studies", href: "#" },
  { label: "Contact", href: "#" },
];

const resourceLinks = [
  { label: "FAQ", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="17.25" cy="6.75" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="8" cy="9" r="1.2" fill="currentColor" />
        <path
          d="M7 11.5v5.5M11 11.5v5.5m0-3c0-1.7 1-2.7 2.5-2.7S16 12.3 16 14v3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M5 4h3.5l3.7 5.2L16.5 4H19l-5.7 6.8L19.8 20h-3.4l-4.2-5.9L7 20H4.5l6-7.2z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#99A9D6]">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-base text-[#E8EDFF] transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterSection() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const updateYear = () => setYear(new Date().getFullYear());
    updateYear();

    const timer = window.setInterval(updateYear, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#000226] text-white">
      <div className="section-container py-10 sm:py-12 lg:py-14">
        <div className="grid items-stretch gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
          <div className="relative min-h-45 sm:min-h-55 md:min-h-65">
            <Image
              src="/logo_light.png"
              alt="Geez logo"
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-left"
            />
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="grid grid-cols-2 gap-8">
              <FooterLinks title="Company" links={companyLinks} />
              <FooterLinks title="Resources" links={resourceLinks} />
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#99A9D6]">
                Follow Us
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                {socialLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#4A5B8F] text-[#E8EDFF] transition-all duration-300 hover:border-white hover:text-white"
                  >
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#223062] pt-5 text-center text-sm text-[#B9C6EE] sm:mt-12">
          <p>© {year} Geez Creationz. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
