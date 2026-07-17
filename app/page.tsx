"use client";

import { useState } from "react";
import { INDUSTRY_LIST, TONE_LIST } from "@/lib/studio/industries";
import { generate } from "@/lib/studio/generator";
import type { GenerateInput, IndustryId, ScriptResult, ToneId } from "@/lib/studio/types";
import ResultView from "@/components/studio/ResultView";
import { RefreshCw, Sparkles, Wand2 } from "lucide-react";

const DURATIONS: { value: 30 | 45 | 60; label: string }[] = [
  { value: 30, label: "30 giây" },
  { value: 45, label: "45 giây" },
  { value: 60, label: "60 giây" },
];

export default function Page() {
  const [industry, setIndustry] = useState<IndustryId>("cosmetics");
  const [tone, setTone] = useState<ToneId>("friendly");
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [benefit, setBenefit] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState<30 | 45 | 60>(45);
  const [result, setResult] = useState<ScriptResult | null>(null);
  const [seed, setSeed] = useState(1);

  function run(nextSeed: number) {
    const input: GenerateInput = {
      industry,
      tone,
      product,
      audience,
      benefit,
      price,
      duration,
      seed: nextSeed,
    };
    setResult(generate(input));
    setSeed(nextSeed);
    if (typeof document !== "undefined") {
      document.getElementById("ket-qua")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const canGenerate = product.trim().length > 0;

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-ink-900/70 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-brand/60 focus:ring-2 focus:ring-brand/30";
  const labelCls = "mb-1.5 block text-xs font-semibold text-slate-300";

  return (
    <main className="min-h-screen bg-ink-900 text-white">
      {/* HERO */}
      <div className="aurora relative overflow-hidden border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-neon">
            <Sparkles size={14} /> Dành cho người làm nội dung TikTok &amp; bán hàng
          </div>
          <h1 className="text-3xl font-black leading-tight sm:text-5xl">
            AI Script{" "}
            <span className="bg-gradient-to-r from-brand to-cyan-neon bg-clip-text text-transparent">
              Studio
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
            Có ảnh/video AI rồi, giờ cần lời? Nhập tên sản phẩm, chọn ngành — app tự viết{" "}
            <span className="font-medium text-white">
              Hook 3 giây, kịch bản 30–60s, lời thoại, CTA, caption và hashtag
            </span>{" "}
            trong 1 nốt nhạc.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-slate-400">
            {INDUSTRY_LIST.map((i) => (
              <span key={i.id} className="rounded-full bg-white/5 px-3 py-1">
                {i.emoji} {i.name.split(" / ")[0]}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[380px_1fr]">
        {/* FORM */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-white/10 bg-ink-800/60 p-5 shadow-card">
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold">
              <Wand2 size={18} className="text-brand" /> Thông tin sản phẩm
            </h2>

            {/* Ngành */}
            <label className={labelCls}>Ngành hàng</label>
            <div className="mb-4 grid grid-cols-2 gap-2">
              {INDUSTRY_LIST.map((i) => (
                <button
                  key={i.id}
                  type="button"
                  onClick={() => setIndustry(i.id)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-xs transition ${
                    industry === i.id
                      ? "border-brand bg-brand/15 text-white"
                      : "border-white/10 bg-ink-900/50 text-slate-300 hover:border-white/25"
                  }`}
                >
                  <span className="text-base">{i.emoji}</span>
                  <span className="mt-0.5 block font-semibold">{i.name.split(" / ")[0]}</span>
                </button>
              ))}
            </div>

            {/* Tên sản phẩm */}
            <div className="mb-3">
              <label className={labelCls}>
                Tên sản phẩm <span className="text-brand">*</span>
              </label>
              <input
                className={inputCls}
                placeholder="VD: Serum dưỡng trắng Vitamin C"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>

            {/* Điểm nổi bật */}
            <div className="mb-3">
              <label className={labelCls}>Điểm nổi bật (tuỳ chọn)</label>
              <input
                className={inputCls}
                placeholder="VD: mờ thâm sau 2 tuần, cấp ẩm sâu"
                value={benefit}
                onChange={(e) => setBenefit(e.target.value)}
              />
            </div>

            {/* Đối tượng + giá */}
            <div className="mb-3 grid grid-cols-2 gap-2">
              <div>
                <label className={labelCls}>Đối tượng</label>
                <input
                  className={inputCls}
                  placeholder="VD: chị em công sở"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Giá bán</label>
                <input
                  className={inputCls}
                  placeholder="VD: 199k"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Tone */}
            <label className={labelCls}>Phong cách</label>
            <div className="mb-4 flex flex-wrap gap-2">
              {TONE_LIST.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  title={t.desc}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs transition ${
                    tone === t.id
                      ? "border-cyan-neon bg-cyan-neon/15 text-cyan-neon"
                      : "border-white/10 bg-ink-900/50 text-slate-300 hover:border-white/25"
                  }`}
                >
                  {t.emoji} {t.name}
                </button>
              ))}
            </div>

            {/* Thời lượng */}
            <label className={labelCls}>Thời lượng video</label>
            <div className="mb-5 grid grid-cols-3 gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDuration(d.value)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    duration === d.value
                      ? "border-brand bg-brand/15 text-white"
                      : "border-white/10 bg-ink-900/50 text-slate-300 hover:border-white/25"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={!canGenerate}
              onClick={() => run(seed + 1)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-dark px-4 py-3 text-sm font-bold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Sparkles size={16} /> Viết kịch bản ngay
            </button>
            {!canGenerate && (
              <p className="mt-2 text-center text-xs text-slate-500">
                Nhập tên sản phẩm để bắt đầu
              </p>
            )}
          </div>
        </div>

        {/* KẾT QUẢ */}
        <div id="ket-qua" className="min-h-[400px] scroll-mt-6">
          {result ? (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => run(seed + 1)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                >
                  <RefreshCw size={14} /> Tạo phiên bản khác
                </button>
              </div>
              <ResultView result={result} />
            </div>
          ) : (
            <div className="grid h-full min-h-[400px] place-items-center rounded-2xl border border-dashed border-white/15 bg-ink-800/30 p-8 text-center">
              <div>
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-brand/15 text-brand">
                  <Wand2 size={30} />
                </div>
                <h3 className="text-lg font-bold text-white">Kịch bản sẽ hiện ở đây</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400">
                  Điền thông tin sản phẩm bên trái rồi bấm{" "}
                  <span className="text-white">“Viết kịch bản ngay”</span>. Bạn sẽ nhận đủ bộ:
                  Hook, kịch bản, lời thoại, CTA, caption và hashtag.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        AI Script Studio — công cụ viết nội dung bán hàng cho người làm TikTok.
      </footer>
    </main>
  );
}
