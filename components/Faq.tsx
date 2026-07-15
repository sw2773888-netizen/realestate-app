"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Faq as FaqType } from "@/lib/types";

export default function Faq({ faq }: { faq: FaqType }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-bold text-ink">{faq.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-relaxed text-gray-600">
          {faq.a}
        </div>
      )}
    </div>
  );
}
