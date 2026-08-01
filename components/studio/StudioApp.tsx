"use client";

import { useMemo, useState } from "react";
import { Sparkles, Wand2, RotateCcw } from "lucide-react";
import type { Option, StudioInput } from "@/lib/prompt/types";
import {
  ASPECTS,
  CAMERAS,
  CAMERA_MOVES,
  DEFAULT_INPUT,
  DURATIONS,
  LIGHTINGS,
  MODES,
  MOODS,
  PRESETS,
  QUALITY_TAGS,
  STYLES,
} from "@/lib/prompt/options";
import { generatePrompts, hasEnoughInput } from "@/lib/prompt/engine";
import PromptCard from "./PromptCard";

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-300">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none transition focus:border-brand"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-slate-800">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 2,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-300">
        {label} {required && <span className="text-brand">*</span>}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-y rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-brand"
      />
    </label>
  );
}

export default function StudioApp() {
  const [input, setInput] = useState<StudioInput>(DEFAULT_INPUT);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const set = <K extends keyof StudioInput>(key: K, value: StudioInput[K]) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  const toggleQuality = (value: string) =>
    setInput((prev) => ({
      ...prev,
      quality: prev.quality.includes(value)
        ? prev.quality.filter((q) => q !== value)
        : [...prev.quality, value],
    }));

  const applyPreset = (preset: (typeof PRESETS)[number]) =>
    setInput((prev) => ({ ...DEFAULT_INPUT, lang: prev.lang, ...preset.input }));

  const ready = hasEnoughInput(input);
  const prompts = useMemo(() => (ready ? generatePrompts(input) : []), [input, ready]);
  const isVideo = input.mode === "video";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      {/* ================= FORM ================= */}
      <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
        {/* Mode */}
        <div>
          <span className="mb-2 block text-xs font-medium text-slate-300">Bạn muốn tạo gì?</span>
          <div className="grid grid-cols-3 gap-2">
            {MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => set("mode", m.value)}
                title={m.hint}
                className={`rounded-xl border px-2 py-3 text-center transition ${
                  input.mode === m.value
                    ? "border-brand bg-brand/15 text-white"
                    : "border-white/10 bg-slate-800/50 text-slate-300 hover:border-white/25"
                }`}
              >
                <div className="text-xl">{m.emoji}</div>
                <div className="mt-1 text-xs font-medium">{m.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Presets */}
        <div>
          <span className="mb-2 block text-xs font-medium text-slate-300">Mẫu nhanh</span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p)}
                className="rounded-full border border-white/10 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-200 transition hover:border-brand hover:text-white"
              >
                {p.emoji} {p.name}
              </button>
            ))}
          </div>
        </div>

        <TextArea
          label={isVideo ? "Muốn làm video gì?" : "Muốn tạo ảnh gì?"}
          value={input.idea}
          onChange={(v) => set("idea", v)}
          required
          rows={3}
          placeholder={
            isVideo
              ? "VD: Cận cảnh tô phở bò bốc khói, đũa gắp sợi phở kéo dài…"
              : "VD: Một cô gái đứng giữa phố Tokyo về đêm dưới mưa neon…"
          }
        />

        <TextArea
          label="Nhân vật / chủ thể như thế nào?"
          value={input.character}
          onChange={(v) => set("character", v)}
          placeholder="VD: cô gái châu Á, áo khoác da đen, tóc ngắn, cầm ô trong suốt"
        />

        <div className="grid grid-cols-1 gap-3">
          <TextArea
            label="Bối cảnh"
            value={input.setting}
            onChange={(v) => set("setting", v)}
            placeholder="VD: phố Tokyo về đêm, mưa nhẹ, biển hiệu neon"
          />
          {isVideo && (
            <TextArea
              label="Hành động / chuyển động"
              value={input.action}
              onChange={(v) => set("action", v)}
              placeholder="VD: cô gái quay đầu nhìn máy quay, đèn xe lướt qua"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select label="Phong cách" value={input.style} onChange={(v) => set("style", v)} options={STYLES} />
          <Select label="Tông cảm xúc" value={input.mood} onChange={(v) => set("mood", v)} options={MOODS} />
          <Select label="Ánh sáng" value={input.lighting} onChange={(v) => set("lighting", v)} options={LIGHTINGS} />
          <Select label="Góc máy" value={input.camera} onChange={(v) => set("camera", v)} options={CAMERAS} />
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced((s) => !s)}
          className="text-xs font-medium text-brand hover:underline"
        >
          {showAdvanced ? "− Ẩn tuỳ chọn nâng cao" : "+ Tuỳ chọn nâng cao"}
        </button>

        {showAdvanced && (
          <div className="space-y-3 rounded-xl border border-white/10 bg-slate-800/30 p-3">
            <div className="grid grid-cols-2 gap-3">
              <Select label="Tỉ lệ khung" value={input.aspect} onChange={(v) => set("aspect", v)} options={ASPECTS} />
              {isVideo && (
                <>
                  <Select
                    label="Chuyển động máy"
                    value={input.cameraMove}
                    onChange={(v) => set("cameraMove", v)}
                    options={CAMERA_MOVES}
                  />
                  <Select
                    label="Thời lượng"
                    value={input.duration}
                    onChange={(v) => set("duration", v)}
                    options={DURATIONS}
                  />
                </>
              )}
            </div>

            <div>
              <span className="mb-2 block text-xs font-medium text-slate-300">Tăng chất lượng</span>
              <div className="flex flex-wrap gap-2">
                {QUALITY_TAGS.map((q) => {
                  const active = input.quality.includes(q.value);
                  return (
                    <button
                      key={q.value}
                      type="button"
                      onClick={() => toggleQuality(q.value)}
                      className={`rounded-full border px-2.5 py-1 text-xs transition ${
                        active
                          ? "border-brand bg-brand/20 text-white"
                          : "border-white/10 bg-slate-800/50 text-slate-300 hover:border-white/25"
                      }`}
                    >
                      {q.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="mb-2 block text-xs font-medium text-slate-300">Ngôn ngữ prompt ChatGPT</span>
              <div className="flex gap-2">
                {(["en", "vi"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => set("lang", l)}
                    className={`flex-1 rounded-xl border px-3 py-2 text-sm transition ${
                      input.lang === l
                        ? "border-brand bg-brand/15 text-white"
                        : "border-white/10 bg-slate-800/50 text-slate-300 hover:border-white/25"
                    }`}
                  >
                    {l === "en" ? "🇬🇧 English" : "🇻🇳 Tiếng Việt"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setInput(DEFAULT_INPUT)}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-white"
        >
          <RotateCcw size={13} /> Đặt lại
        </button>
      </div>

      {/* ================= OUTPUT ================= */}
      <div className="space-y-4">
        {ready ? (
          <>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Sparkles size={16} className="text-brand" />
              Đã tạo <strong className="text-white">{prompts.length}</strong> prompt — cập nhật tự động khi bạn chỉnh
            </div>
            {prompts.map((p) => (
              <PromptCard key={p.key} item={p} />
            ))}
          </>
        ) : (
          <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-900/40 p-8 text-center">
            <Wand2 size={40} className="mb-3 text-brand" />
            <h3 className="text-lg font-semibold text-white">Nhập ý tưởng để bắt đầu</h3>
            <p className="mt-1 max-w-sm text-sm text-slate-400">
              Chỉ cần mô tả bạn muốn làm video/ảnh gì và nhân vật ra sao. App sẽ tự tạo prompt cho Veo,
              Kling, Midjourney, Flux và ChatGPT.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
