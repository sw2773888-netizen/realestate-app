"use client";

import Link from "next/link";
import { Home, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useFavorites } from "./FavoritesProvider";

const navLinks = [
  { href: "/homes?type=sale", label: "Mua nhà" },
  { href: "/homes?type=rent", label: "Cho thuê" },
  { href: "/sell", label: "Bán nhà" },
  { href: "/loans", label: "Vay mua nhà" },
  { href: "/agents", label: "Tìm môi giới" },
  { href: "/prompts", label: "Prompt AI" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-brand">
            <Home className="h-7 w-7" strokeWidth={2.5} />
            <span className="text-2xl font-extrabold tracking-tight text-ink">
              Zola<span className="text-brand">.</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
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

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/favorites"
            className="relative flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand"
          >
            <Heart className="h-5 w-5" />
            Đã lưu
            {favorites.length > 0 && (
              <span className="absolute -right-4 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <button className="rounded-lg border-2 border-brand px-4 py-1.5 text-sm font-semibold text-brand transition hover:bg-brand-light">
            Đăng nhập
          </button>
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
            href="/favorites"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 py-2.5 text-sm font-semibold text-ink"
          >
            <Heart className="h-5 w-5" /> Đã lưu ({favorites.length})
          </Link>
        </nav>
      )}
    </header>
  );
}
