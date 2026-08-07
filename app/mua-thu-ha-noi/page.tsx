"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Download,
  Eye,
  ImagePlus,
  Leaf,
  RotateCcw,
  Sparkles,
  Sun,
  Type,
  Wand2,
} from "lucide-react";
import {
  autumnGrade,
  beautify,
  vignette,
} from "@/lib/imageFilters";
import {
  createLeaves,
  drawCaption,
  drawLeaves,
  updateLeaves,
  type Leaf as LeafParticle,
} from "@/lib/leaves";

const MAX_EDGE = 1400;

interface Params {
  smoothing: number;
  glow: number;
  warmth: number;
  intensity: number;
  saturation: number;
  vignette: number;
  leaves: number;
  caption: boolean;
}

const DEFAULT: Params = {
  smoothing: 55,
  glow: 35,
  warmth: 60,
  intensity: 55,
  saturation: 45,
  vignette: 40,
  leaves: 26,
  caption: true,
};

interface Preset {
  key: string;
  name: string;
  desc: string;
  emoji: string;
  values: Partial<Params>;
}

const PRESETS: Preset[] = [
  {
    key: "hoguom",
    name: "Nắng Hồ Gươm",
    desc: "Vàng trong, dịu nhẹ",
    emoji: "🌤️",
    values: { smoothing: 50, glow: 40, warmth: 55, intensity: 45, saturation: 40, vignette: 30 },
  },
  {
    key: "hoanghon",
    name: "Hoàng hôn Tây Hồ",
    desc: "Cam đỏ, lãng mạn",
    emoji: "🌅",
    values: { smoothing: 55, glow: 45, warmth: 80, intensity: 75, saturation: 60, vignette: 55 },
  },
  {
    key: "codien",
    name: "Cổ điển hoài niệm",
    desc: "Nâu trầm, film",
    emoji: "🍂",
    values: { smoothing: 45, glow: 25, warmth: 70, intensity: 60, saturation: 30, vignette: 65 },
  },
  {
    key: "trongtreo",
    name: "Trong trẻo",
    desc: "Sáng da, nhẹ nhàng",
    emoji: "✨",
    values: { smoothing: 65, glow: 55, warmth: 40, intensity: 35, saturation: 35, vignette: 20 },
  },
];

export default function AutumnStudioPage() {
  const [params, setParams] = useState<Params>(DEFAULT);
  const [activePreset, setActivePreset] = useState<string>("");
  const [hasImage, setHasImage] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [dragOver, setDragOver] = useState(false);

  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const leafCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const srcRef = useRef<ImageData | null>(null);
  const leavesRef = useRef<LeafParticle[]>(createLeaves(DEFAULT.leaves));

  const set = <K extends keyof Params>(key: K, value: Params[K]) => {
    setParams((p) => ({ ...p, [key]: value }));
    if (key !== "leaves" && key !== "caption") setActivePreset("");
  };

  const applyPreset = (preset: Preset) => {
    setParams((p) => ({ ...p, ...preset.values }));
    setActivePreset(preset.key);
  };

  // Nạp ảnh: giảm kích thước tối đa, lấy ImageData gốc để tái xử lý nhanh.
  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d")!;
      octx.drawImage(img, 0, 0, w, h);
      srcRef.current = octx.getImageData(0, 0, w, h);
      URL.revokeObjectURL(url);
      setDims({ w, h });
      setHasImage(true);
      setShowOriginal(false);
    };
    img.src = url;
  }, []);

  // Khi có kích thước mới, đặt kích thước hai canvas.
  useEffect(() => {
    if (!dims.w) return;
    for (const c of [baseCanvasRef.current, leafCanvasRef.current]) {
      if (c) {
        c.width = dims.w;
        c.height = dims.h;
      }
    }
  }, [dims]);

  // Pipeline xử lý ảnh (debounce).
  const process = useCallback(() => {
    const src = srcRef.current;
    const base = baseCanvasRef.current;
    if (!src || !base) return;
    const ctx = base.getContext("2d")!;
    const { w, h } = dims;
    const img = new ImageData(new Uint8ClampedArray(src.data), w, h);
    if (!showOriginal) {
      beautify(img.data, w, h, { smoothing: params.smoothing, glow: params.glow });
      autumnGrade(img.data, {
        warmth: params.warmth,
        intensity: params.intensity,
        saturation: params.saturation,
        vignette: params.vignette,
      });
    }
    ctx.putImageData(img, 0, 0);
    if (!showOriginal) {
      vignette(ctx, w, h, params.vignette);
      if (params.caption) drawCaption(ctx, w, h, "Mùa thu Hà Nội");
    }
    setProcessing(false);
  }, [dims, params, showOriginal]);

  useEffect(() => {
    if (!hasImage) return;
    setProcessing(true);
    const t = setTimeout(process, 110);
    return () => clearTimeout(t);
  }, [hasImage, process]);

  // Tạo lại tập lá khi số lượng thay đổi.
  useEffect(() => {
    leavesRef.current = createLeaves(params.leaves);
  }, [params.leaves]);

  // Vòng lặp hoạt hoạ lá rơi.
  useEffect(() => {
    const cv = leafCanvasRef.current;
    if (!cv || !hasImage) return;
    const ctx = cv.getContext("2d")!;
    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      if (!showOriginal) {
        updateLeaves(leavesRef.current);
        drawLeaves(ctx, leavesRef.current, cv.width, cv.height);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hasImage, showOriginal]);

  const download = () => {
    const base = baseCanvasRef.current;
    if (!base) return;
    const exp = document.createElement("canvas");
    exp.width = dims.w;
    exp.height = dims.h;
    const ectx = exp.getContext("2d")!;
    ectx.drawImage(base, 0, 0);
    if (params.leaves > 0) drawLeaves(ectx, leavesRef.current, dims.w, dims.h);
    exp.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "mua-thu-ha-noi.png";
      a.click();
      URL.revokeObjectURL(a.href);
    }, "image/png");
  };

  const reset = () => {
    setHasImage(false);
    srcRef.current = null;
    setParams(DEFAULT);
    setActivePreset("");
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-gradient-to-b from-[#2a1608] via-[#3d2410] to-[#1c0f05] text-amber-50">
      {/* Thanh trên cùng */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-amber-900/40 bg-[#2a1608]/80 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍂</span>
          <div>
            <h1 className="text-base font-bold leading-tight sm:text-lg">
              Mùa Thu Hà Nội <span className="font-normal text-amber-300/80">Studio</span>
            </h1>
            <p className="hidden text-xs text-amber-200/60 sm:block">
              Làm đẹp khuôn mặt gốc &amp; khoác sắc thu — xử lý ngay trên máy bạn
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="rounded-full border border-amber-700/50 px-3 py-1.5 text-xs text-amber-200/80 transition hover:bg-amber-900/40"
        >
          ← Trang chủ
        </Link>
      </header>

      <div className="mx-auto grid max-w-6xl gap-5 p-4 sm:p-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Khu vực ảnh */}
        <section className="min-w-0">
          {!hasImage ? (
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                if (e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]);
              }}
              className={`flex aspect-[4/5] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
                dragOver
                  ? "border-amber-400 bg-amber-500/10"
                  : "border-amber-700/50 bg-black/20 hover:border-amber-500/70 hover:bg-black/30"
              }`}
            >
              <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-amber-500/20">
                <ImagePlus className="h-8 w-8 text-amber-300" />
              </div>
              <p className="text-lg font-semibold">Tải ảnh chân dung của bạn</p>
              <p className="mt-1 max-w-xs text-sm text-amber-200/60">
                Kéo &amp; thả ảnh vào đây hoặc bấm để chọn. Ảnh được xử lý ngay trên
                trình duyệt, không tải lên máy chủ.
              </p>
              <span className="mt-4 rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-amber-950">
                Chọn ảnh
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])}
              />
            </label>
          ) : (
            <div className="space-y-3">
              <div
                className="relative mx-auto overflow-hidden rounded-2xl bg-black shadow-2xl"
                style={{ aspectRatio: `${dims.w} / ${dims.h}`, maxHeight: "72vh" }}
              >
                <canvas ref={baseCanvasRef} className="absolute inset-0 h-full w-full" />
                <canvas
                  ref={leafCanvasRef}
                  className="pointer-events-none absolute inset-0 h-full w-full"
                />
                {processing && !showOriginal && (
                  <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-300" />
                    Đang xử lý…
                  </div>
                )}
                {showOriginal && (
                  <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs">
                    Ảnh gốc
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onMouseDown={() => setShowOriginal(true)}
                  onMouseUp={() => setShowOriginal(false)}
                  onMouseLeave={() => setShowOriginal(false)}
                  onTouchStart={() => setShowOriginal(true)}
                  onTouchEnd={() => setShowOriginal(false)}
                  className="flex items-center gap-2 rounded-full border border-amber-700/50 px-4 py-2 text-sm transition hover:bg-amber-900/40"
                >
                  <Eye className="h-4 w-4" /> Giữ để xem ảnh gốc
                </button>
                <button
                  onClick={download}
                  className="flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-amber-950 transition hover:bg-amber-400"
                >
                  <Download className="h-4 w-4" /> Tải ảnh về
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 rounded-full border border-amber-700/50 px-4 py-2 text-sm transition hover:bg-amber-900/40"
                >
                  <RotateCcw className="h-4 w-4" /> Ảnh khác
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Bảng điều khiển */}
        <section className="space-y-5">
          {/* Preset */}
          <div>
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-200">
              <Wand2 className="h-4 w-4" /> Phong cách
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => applyPreset(p)}
                  className={`rounded-xl border p-3 text-left transition ${
                    activePreset === p.key
                      ? "border-amber-400 bg-amber-500/15"
                      : "border-amber-800/40 bg-black/20 hover:border-amber-600/60"
                  }`}
                >
                  <div className="text-sm font-semibold">
                    {p.emoji} {p.name}
                  </div>
                  <div className="text-xs text-amber-200/60">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Làm đẹp da */}
          <div className="rounded-xl border border-amber-800/40 bg-black/20 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-amber-200">
              <Sparkles className="h-4 w-4" /> Làm đẹp khuôn mặt
            </h2>
            <Slider label="Làm mịn da" value={params.smoothing} onChange={(v) => set("smoothing", v)} />
            <Slider label="Sáng da" value={params.glow} onChange={(v) => set("glow", v)} />
          </div>

          {/* Sắc thu */}
          <div className="rounded-xl border border-amber-800/40 bg-black/20 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-amber-200">
              <Sun className="h-4 w-4" /> Sắc thu Hà Nội
            </h2>
            <Slider label="Ấm áp (vàng/cam)" value={params.warmth} onChange={(v) => set("warmth", v)} />
            <Slider label="Nắng vàng" value={params.intensity} onChange={(v) => set("intensity", v)} />
            <Slider label="Độ rực màu" value={params.saturation} onChange={(v) => set("saturation", v)} />
            <Slider label="Tối góc (vignette)" value={params.vignette} onChange={(v) => set("vignette", v)} />
          </div>

          {/* Trang trí */}
          <div className="rounded-xl border border-amber-800/40 bg-black/20 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-amber-200">
              <Leaf className="h-4 w-4" /> Trang trí
            </h2>
            <Slider label="Lá rơi" value={params.leaves} min={0} max={60} onChange={(v) => set("leaves", v)} />
            <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={params.caption}
                onChange={(e) => set("caption", e.target.checked)}
                className="h-4 w-4 accent-amber-500"
              />
              <Type className="h-4 w-4 text-amber-300" />
              Chữ &ldquo;Mùa thu Hà Nội&rdquo;
            </label>
          </div>

          <p className="text-center text-xs text-amber-200/40">
            🔒 Ảnh của bạn không rời khỏi thiết bị — mọi xử lý diễn ra ngay trong trình duyệt.
          </p>
        </section>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-amber-100/80">{label}</span>
        <span className="tabular-nums text-amber-300/70">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-amber-900/60 accent-amber-500"
      />
    </div>
  );
}
