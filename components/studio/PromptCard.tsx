import type { GeneratedPrompt } from "@/lib/prompt/types";
import CopyButton from "./CopyButton";

export default function PromptCard({ item }: { item: GeneratedPrompt }) {
  const full =
    item.prompt +
    (item.negative ? `\n\nNegative prompt: ${item.negative}` : "");

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-lg backdrop-blur sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-base font-semibold text-white">
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">{item.description}</p>
        </div>
        <CopyButton text={full} />
      </div>

      <pre className="whitespace-pre-wrap break-words rounded-xl bg-black/40 p-3.5 font-mono text-[13px] leading-relaxed text-slate-100">
        {item.prompt}
      </pre>

      {item.negative && (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-rose-400">
              Negative prompt
            </span>
            <CopyButton text={item.negative} label="Sao chép negative" />
          </div>
          <pre className="whitespace-pre-wrap break-words rounded-xl bg-black/40 p-3 font-mono text-[12px] leading-relaxed text-rose-200/80">
            {item.negative}
          </pre>
        </div>
      )}

      {item.params && (
        <p className="mt-3 font-mono text-xs text-brand">{item.params}</p>
      )}
    </div>
  );
}
