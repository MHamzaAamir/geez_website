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
    <div className="border border-white/15 rounded-xl overflow-hidden bg-white/[0.04]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center gap-3 px-5 py-4 text-white/85 hover:bg-white/[0.06] transition-colors text-left"
      >
        <span>{question}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 text-white/55 px-5 ${
          open ? "max-h-40 pb-4" : "max-h-0"
        }`}
      >
        {answer}
      </div>
    </div>
  );
}
