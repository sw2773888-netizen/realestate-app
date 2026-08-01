import { Sparkles } from "lucide-react";
import StudioApp from "@/components/studio/StudioApp";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand">
          <Sparkles size={14} /> Công cụ cho người sáng tạo nội dung AI
        </div>
        <h1 className="bg-gradient-to-r from-white via-slate-200 to-brand bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          AI Prompt Studio
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
          Tạo nguyên liệu đầu vào cho AI. Bạn chỉ cần nhập ý tưởng — app tự tạo prompt tạo ảnh,
          prompt Veo/Kling, prompt ChatGPT và prompt Flux/Midjourney.
        </p>
      </header>

      <StudioApp />
    </div>
  );
}
