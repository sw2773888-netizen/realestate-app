"use client";

import { useMemo, useState } from "react";
import { Search, Copy, Check } from "lucide-react";
import { promptCategories, totalPrompts } from "@/lib/prompts";

type FlatPrompt = {
  text: string;
  categorySlug: string;
  categoryTitle: string;
  emoji: string;
  index: number;
};

const allPrompts: FlatPrompt[] = promptCategories.flatMap((c) =>
  c.prompts.map((text, i) => ({
    text,
    categorySlug: c.slug,
    categoryTitle: c.title,
    emoji: c.emoji,
    index: i + 1,
  })),
);

export default function PromptLibrary() {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPrompts.filter((p) => {
      const okCat = active === "all" || p.categorySlug === active;
      const okQuery = q === "" || p.text.toLowerCase().includes(q);
      return okCat && okQuery;
    });
  }, [active, query]);

  const copy = async (p: FlatPrompt) => {
    const key = `${p.categorySlug}-${p.index}`;
    try {
      await navigator.clipboard.writeText(p.text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500);
    } catch {
      /* clipboard không khả dụng */
    }
  };

  return (
    <section id="thu-vien" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          Thư viện {totalPrompts} Prompt
        </h2>
        <p className="mt-2 text-gray-500">
          Chọn nhóm, tìm kiếm và bấm <strong>Sao chép</strong> để dùng ngay. Thay
          các ô <code className="rounded bg-brand-light px-1 text-brand">[...]</code>{" "}
          bằng thông tin sản phẩm của bạn.
        </p>
      </div>

      {/* Ô tìm kiếm */}
      <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 shadow-card focus-within:border-brand">
        <Search className="h-5 w-5 flex-none text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm prompt theo từ khóa (vd: unboxing, hook, sale...)"
          className="w-full bg-transparent text-ink outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Bộ lọc nhóm */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <FilterChip
          label={`Tất cả (${totalPrompts})`}
          isActive={active === "all"}
          onClick={() => setActive("all")}
        />
        {promptCategories.map((c) => (
          <FilterChip
            key={c.slug}
            label={`${c.emoji} ${c.title.replace("Prompt ", "")} (${c.prompts.length})`}
            isActive={active === c.slug}
            onClick={() => setActive(c.slug)}
          />
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-gray-400">
        Đang hiển thị {filtered.length} prompt
      </p>

      {/* Danh sách prompt */}
      <div className="mt-4 grid gap-3">
        {filtered.map((p) => {
          const key = `${p.categorySlug}-${p.index}`;
          const isCopied = copied === key;
          return (
            <div
              key={key}
              className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-brand hover:shadow-card"
            >
              <span className="mt-0.5 flex-none text-xl" aria-hidden>
                {p.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-ink">{p.text}</p>
                <span className="mt-1 inline-block text-xs font-medium text-gray-400">
                  {p.categoryTitle}
                </span>
              </div>
              <button
                onClick={() => copy(p)}
                className={`flex flex-none items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
                  isCopied
                    ? "border-green-500 text-green-600"
                    : "border-brand text-brand hover:bg-brand-light"
                }`}
                aria-label="Sao chép prompt"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4" /> Đã chép
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Sao chép
                  </>
                )}
              </button>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="py-12 text-center text-gray-400">
            Không tìm thấy prompt phù hợp. Thử từ khóa khác nhé.
          </p>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
        isActive
          ? "border-brand bg-brand text-white"
          : "border-gray-200 text-ink hover:border-brand hover:text-brand"
      }`}
    >
      {label}
    </button>
  );
}
