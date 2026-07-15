"use client";

import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { BRAND } from "@/lib/data";

const navLinks = [
  { href: "/courses", label: "Khóa học" },
  { href: "/#lo-trinh", label: "Lộ trình" },
  { href: "/#cam-nhan", label: "Cảm nhận" },
  { href: "/about", label: "Về Thanh Hương" },
  { href: "/#faq", label: "Hỏi đáp" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white">
              <Sparkles className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-ink sm:text-xl">
              Thanh Hương<span className="text-gradient"> Academy</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-ink transition-colors hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/register"
            className="rounded-full bg-brand-gradient px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
          >
            Đăng ký học ngay
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-gray-100 bg-white px-4 py-3 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-semibold text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-brand-gradient px-5 py-2.5 text-center text-sm font-bold text-white"
          >
            Đăng ký học ngay
          </Link>
        </nav>
      )}
    </header>
  );
}
