"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { name: "INDUSTRIES", href: "/" },
  { name: "BUNDLES", href: "/" },
  { name: "SERVICES", href: "/" },
  { name: "ABOUT", href: "/" },
  { name: "SHOWREEL", href: "/" },
];

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <nav className="fixed top-4 right-0 z-40 flex h-16 w-[96%] items-center bg-[#1D1D2B]/85 backdrop-blur-sm md:top-10 md:h-15 md:w-[95%]">
        <div className="absolute left-0 top-0 h-full w-1 bg-white/80" />

        <div className="flex w-full items-center justify-between gap-4 px-4 sm:px-6 md:gap-6 md:px-8 lg:gap-32 lg:px-10">
          <Link href="/" onClick={closeSidebar}>
            <Image src="/logo.png" alt="Logo" width={95} height={58} />
          </Link>

          <div className="hidden items-center justify-between md:flex md:w-[88%] lg:w-[90%] md:text-sm lg:text-lg lg:max-w-[1800px]">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#FFE102] transition-colors hover:text-white/70"
              >
                {link.name}
              </Link>
            ))}
            <button className="top-right-bottom-left-clip-nav-buttons bg-white px-3 py-1 text-black">
              Contact Us
            </button>
            <button className="top-right-bottom-left-clip-nav-buttons bg-[#A036C5] px-3 py-1 text-white">
              Book A Meet
            </button>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={isSidebarOpen}
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/25 text-[#FFE102] transition-colors hover:border-white/50 hover:text-white md:hidden"
          >
            <Menu size={22} strokeWidth={2.2} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/55 transition-opacity duration-300 md:hidden ${
          isSidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 z-50 flex h-dvh w-[82vw] max-w-90 flex-col bg-[#0D1025] p-6 text-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isSidebarOpen}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-sm tracking-[0.2em] text-[#B8C4F4]">MENU</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 text-[#FFE102] transition-colors hover:text-white"
          >
            <X size={22} strokeWidth={2.2} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeSidebar}
              className="text-lg font-medium text-[#FFE102] transition-colors hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button className="top-right-bottom-left-clip-nav-buttons bg-white px-4 py-2 text-black">
            Contact Us
          </button>
          <button className="top-right-bottom-left-clip-nav-buttons bg-[#A036C5] px-4 py-2 text-white">
            Book A Meet
          </button>
        </div>
      </aside>
    </>
  );
}
