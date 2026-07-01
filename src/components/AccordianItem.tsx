"use client";
import { useState } from "react";

export default function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/12 bg-linear-to-br from-white/10 to-white/4 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-white transition-colors hover:bg-white/6 sm:px-5 md:px-6"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <span className="h-10 w-1 rounded-full bg-[#D948FD] shadow-[0_0_20px_rgba(217,72,253,0.45)]" />
          <span className="text-sm font-medium leading-snug sm:text-base md:text-lg">
            {question}
          </span>
        </div>
        <span className="text-xl leading-none text-[#FFE102] md:text-2xl">
          {open ? "-" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden px-4 text-white/70 transition-all duration-300 sm:px-5 md:px-6 ${
          open ? "max-h-48 pb-4 md:pb-5" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 pt-4 text-sm leading-relaxed md:text-base">
          {answer}
        </div>
      </div>
    </div>
  );
}
