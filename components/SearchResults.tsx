"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { properties } from "@/lib/data";
import { homeTypes } from "@/lib/data";
import { HomeType, ListingType } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import PropertyCard from "./PropertyCard";
import SearchBar from "./SearchBar";

type SortKey = "relevant" | "priceAsc" | "priceDesc" | "newest";

const priceRangesSale = [
  { label: "Tất cả mức giá", min: 0, max: Infinity },
  { label: "Dưới 3 tỷ", min: 0, max: 3_000_000_000 },
  { label: "3 - 6 tỷ", min: 3_000_000_000, max: 6_000_000_000 },
  { label: "6 - 10 tỷ", min: 6_000_000_000, max: 10_000_000_000 },
  { label: "Trên 10 tỷ", min: 10_000_000_000, max: Infinity },
];

const priceRangesRent = [
  { label: "Tất cả mức giá", min: 0, max: Infinity },
  { label: "Dưới 10 triệu", min: 0, max: 10_000_000 },
  { label: "10 - 20 triệu", min: 10_000_000, max: 20_000_000 },
  { label: "Trên 20 triệu", min: 20_000_000, max: Infinity },
];

export default function SearchResults() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const typeParam = params.get("type") as ListingType | null;

  const [listingType, setListingType] = useState<ListingType | "all">(
    typeParam ?? "all"
  );
  const [homeType, setHomeType] = useState<HomeType | "all">("all");
  const [priceIdx, setPriceIdx] = useState(0);
  const [beds, setBeds] = useState(0);
  const [sort, setSort] = useState<SortKey>("relevant");
  const [showFilters, setShowFilters] = useState(false);

  const priceRanges =
    listingType === "rent" ? priceRangesRent : priceRangesSale;

  const results = useMemo(() => {
    let list = properties.filter((p) => {
      if (listingType !== "all" && p.listingType !== listingType) return false;
      if (homeType !== "all" && p.homeType !== homeType) return false;
      if (beds > 0 && p.beds < beds) return false;

      const range = priceRanges[priceIdx] ?? priceRanges[0];
      if (p.price < range.min || p.price > range.max) return false;

      if (q) {
        const hay = `${p.title} ${p.address} ${p.district} ${p.city} ${p.homeType}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "newest":
          return a.daysOnMarket - b.daysOnMarket;
        default:
          return 0;
      }
    });

    return list;
  }, [listingType, homeType, priceIdx, beds, sort, q, priceRanges]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Thanh tìm kiếm */}
      <div className="mb-5 max-w-2xl">
        <SearchBar defaultValue={q} />
      </div>

      {/* Bộ lọc */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-ink hover:border-brand"
        >
          <SlidersHorizontal className="h-4 w-4" /> Bộ lọc
        </button>

        <Segmented
          value={listingType}
          onChange={(v) => {
            setListingType(v as ListingType | "all");
            setPriceIdx(0);
          }}
          options={[
            { value: "all", label: "Tất cả" },
            { value: "sale", label: "Bán" },
            { value: "rent", label: "Cho thuê" },
          ]}
        />

        <div className="ml-auto flex items-center gap-2 text-sm">
          <span className="text-gray-500">Sắp xếp:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-gray-300 px-3 py-2 font-semibold text-ink outline-none focus:border-brand"
          >
            <option value="relevant">Liên quan nhất</option>
            <option value="newest">Mới nhất</option>
            <option value="priceAsc">Giá thấp → cao</option>
            <option value="priceDesc">Giá cao → thấp</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 grid gap-5 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-bold text-ink">
              Loại nhà
            </label>
            <select
              value={homeType}
              onChange={(e) => setHomeType(e.target.value as HomeType | "all")}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
            >
              <option value="all">Tất cả loại</option>
              {homeTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-ink">
              Mức giá
            </label>
            <select
              value={priceIdx}
              onChange={(e) => setPriceIdx(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
            >
              {priceRanges.map((r, i) => (
                <option key={r.label} value={i}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-ink">
              Số phòng ngủ
            </label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setBeds(n)}
                  className={`flex-1 rounded-lg border px-2 py-2 text-sm font-semibold transition ${
                    beds === n
                      ? "border-brand bg-brand text-white"
                      : "border-gray-300 bg-white text-ink hover:border-brand"
                  }`}
                >
                  {n === 0 ? "Tất cả" : `${n}+`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tiêu đề kết quả */}
      <div className="mb-4 flex items-baseline gap-2">
        <h1 className="text-xl font-extrabold text-ink">
          {q ? `Kết quả cho "${q}"` : "Bất động sản"}
        </h1>
        <span className="text-sm text-gray-500">
          {results.length} kết quả
        </span>
      </div>

      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-20 text-center">
          <p className="text-lg font-semibold text-ink">
            Không tìm thấy bất động sản phù hợp
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-md px-4 py-1.5 text-sm font-semibold transition ${
            value === o.value
              ? "bg-brand text-white"
              : "text-ink hover:bg-gray-100"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
