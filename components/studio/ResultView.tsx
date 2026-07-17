"use client";

import CopyButton from "./CopyButton";
import type { ScriptResult } from "@/lib/studio/types";
import { Clapperboard, Hash, Megaphone, MessageSquareText, Sparkles, Type } from "lucide-react";

function Section({
  icon,
  title,
  hint,
  copyText,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
  copyText: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-ink-800/60 p-4 sm:p-5 shadow-card">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/15 text-brand">
            {icon}
          </span>
          <div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            {hint && <p className="text-xs text-slate-400">{hint}</p>}
          </div>
        </div>
        <CopyButton text={copyText} />
      </div>
      {children}
    </section>
  );
}

export default function ResultView({ result }: { result: ScriptResult }) {
  const fullExport = [
    "🎬 HOOK 3 GIÂY",
    ...result.hooks.map((h, i) => `${i + 1}. ${h}`),
    "",
    "🎞️ KỊCH BẢN",
    ...result.beats.map((b) => `[${b.time}] ${b.label}\n  Hình ảnh: ${b.visual}\n  Lời thoại: ${b.voiceover}`),
    "",
    "🗣️ LỜI THOẠI (đọc liền mạch)",
    result.voiceover,
    "",
    "📣 CTA",
    result.cta,
    "",
    "📝 CAPTION",
    result.caption,
    "",
    "🏷️ HASHTAG",
    result.hashtags.map((h) => `#${h}`).join(" "),
  ].join("\n");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-300">Kết quả của bạn</p>
        <CopyButton text={fullExport} label="Copy tất cả" className="bg-brand/90 text-white hover:bg-brand" />
      </div>

      {/* HOOK */}
      <Section
        icon={<Sparkles size={16} />}
        title="Hook 3 giây đầu"
        hint="Chọn 1 câu bạn thấy hợp nhất để mở video"
        copyText={result.hooks.join("\n")}
      >
        <ul className="space-y-2">
          {result.hooks.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-sm text-slate-100"
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-cyan-neon/20 text-[11px] font-bold text-cyan-neon">
                {i + 1}
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* KỊCH BẢN */}
      <Section
        icon={<Clapperboard size={16} />}
        title="Kịch bản theo timeline"
        hint="Kèm gợi ý hình ảnh và lời thoại từng phần"
        copyText={result.beats
          .map((b) => `[${b.time}] ${b.label}\nHình ảnh: ${b.visual}\nLời thoại: ${b.voiceover}`)
          .join("\n\n")}
      >
        <ol className="space-y-3">
          {result.beats.map((b, i) => (
            <li key={i} className="relative rounded-xl bg-white/5 p-3">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-brand/20 px-2 py-0.5 text-[11px] font-bold text-brand">
                  {b.time}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-cyan-neon">
                  {b.label}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-slate-100">
                <span className="text-slate-400">🎥 Hình ảnh: </span>
                {b.visual}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-100">
                <span className="text-slate-400">🗣️ Lời thoại: </span>
                <span className="font-medium">{b.voiceover}</span>
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <div className="grid gap-4 md:grid-cols-2">
        {/* LỜI THOẠI */}
        <Section
          icon={<MessageSquareText size={16} />}
          title="Lời thoại liền mạch"
          hint="Đọc để thu âm hoặc lồng tiếng"
          copyText={result.voiceover}
        >
          <p className="text-sm leading-relaxed text-slate-100">{result.voiceover}</p>
        </Section>

        {/* CTA */}
        <Section
          icon={<Megaphone size={16} />}
          title="CTA — Kêu gọi chốt đơn"
          copyText={result.cta}
        >
          <p className="text-sm font-medium leading-relaxed text-slate-100">{result.cta}</p>
        </Section>
      </div>

      {/* CAPTION */}
      <Section
        icon={<Type size={16} />}
        title="Caption đăng bài"
        copyText={result.caption}
      >
        <p className="text-sm leading-relaxed text-slate-100">{result.caption}</p>
      </Section>

      {/* HASHTAG */}
      <Section
        icon={<Hash size={16} />}
        title="Hashtag gợi ý"
        copyText={result.hashtags.map((h) => `#${h}`).join(" ")}
      >
        <div className="flex flex-wrap gap-2">
          {result.hashtags.map((h) => (
            <span
              key={h}
              className="rounded-full bg-cyan-neon/10 px-3 py-1 text-xs font-medium text-cyan-neon"
            >
              #{h}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}
