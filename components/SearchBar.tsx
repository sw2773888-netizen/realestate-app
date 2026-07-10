"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({
  large = false,
  defaultValue = "",
}: {
  large?: boolean;
  defaultValue?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState(defaultValue);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    router.push(`/homes?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className={`flex w-full items-center overflow-hidden rounded-xl bg-white shadow-card ${
        large ? "h-14" : "h-12"
      }`}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Nhập địa chỉ, khu vực, quận hoặc thành phố"
        className="h-full flex-1 px-5 text-base text-ink outline-none placeholder:text-gray-400"
      />
      <button
        type="submit"
        aria-label="Tìm kiếm"
        className="flex h-full items-center justify-center bg-brand px-6 text-white transition hover:bg-brand-dark"
      >
        <Search className="h-5 w-5" strokeWidth={2.5} />
      </button>
    </form>
  );
}
