"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorites } from "@/components/FavoritesProvider";
import { properties } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const saved = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="flex items-center gap-2 text-2xl font-extrabold text-ink">
        <Heart className="h-7 w-7 text-red-500" /> Nhà đã lưu
      </h1>
      <p className="mt-1 text-gray-500">
        {saved.length} bất động sản trong danh sách yêu thích của bạn
      </p>

      {saved.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-gray-300 py-20 text-center">
          <Heart className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-4 text-lg font-semibold text-ink">
            Chưa có nhà nào được lưu
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Nhấn vào biểu tượng trái tim trên mỗi tin để lưu lại.
          </p>
          <Link
            href="/homes"
            className="mt-6 inline-block rounded-lg bg-brand px-6 py-2.5 font-semibold text-white"
          >
            Khám phá bất động sản
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
