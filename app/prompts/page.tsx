import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles, Zap, Gift } from "lucide-react";
import { promptCategories, totalPrompts } from "@/lib/prompts";
import PromptLibrary from "@/components/PromptLibrary";

export const metadata: Metadata = {
  title: `Bộ ${totalPrompts} Prompt AI Kiếm Tiền — Zola`,
  description:
    "Bộ 500 prompt AI kiếm tiền: làm video AI, viết kịch bản, viết hook, tạo ảnh, review sản phẩm, Shopee Affiliate và TikTok. Copy là dùng được ngay.",
};

const benefits = [
  "500 prompt chia 7 nhóm, bám sát công việc kiếm tiền thực tế.",
  "Copy - dán - điền thông tin sản phẩm là chạy được ngay.",
  "Tối ưu cho TikTok, Reels, Shopee Affiliate và bán hàng online.",
  "Dùng được với ChatGPT, Gemini, Claude, Midjourney, Runway, Kling...",
  "Cập nhật theo trend, phù hợp người mới lẫn creator chuyên nghiệp.",
];

export default function PromptsPage() {
  return (
    <div>
      {/* HERO / SALES */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-brand-light to-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4" /> Bộ công cụ cho Creator
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            Bộ {totalPrompts} Prompt AI
            <br />
            <span className="text-brand">Kiếm Tiền</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Trọn bộ prompt giúp bạn làm video AI, viết kịch bản, viết hook, tạo
            ảnh, review sản phẩm, làm Shopee Affiliate và bùng nổ trên TikTok —
            copy là dùng được ngay.
          </p>

          {/* Giá trị */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex items-end gap-3">
              <span className="text-lg text-gray-400 line-through">999.000đ</span>
              <span className="text-4xl font-extrabold text-brand">MIỄN PHÍ</span>
            </div>
            <span className="text-sm text-gray-500">
              Giá trị công bố <strong>999K</strong> — trọn bộ ngay trong trang này.
            </span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#thu-vien"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-3 font-semibold text-white transition hover:bg-brand-dark"
            >
              <Zap className="h-5 w-5" /> Dùng ngay 500 prompt
            </Link>
            <Link
              href="#nhom"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-brand px-8 py-3 font-semibold text-brand transition hover:bg-brand-light"
            >
              Xem 7 nhóm prompt
            </Link>
          </div>
        </div>
      </section>

      {/* THỐNG KÊ NHANH */}
      <section className="border-b border-gray-100">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-4 py-10 sm:grid-cols-4 sm:px-6">
          <Stat value={`${totalPrompts}`} label="Prompt" />
          <Stat value="7" label="Nhóm chủ đề" />
          <Stat value="999K" label="Giá trị công bố" />
          <Stat value="∞" label="Lần dùng lại" />
        </div>
      </section>

      {/* LỢI ÍCH */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">
          Bạn nhận được gì?
        </h2>
        <div className="mx-auto mt-8 grid max-w-2xl gap-3">
          {benefits.map((b) => (
            <div
              key={b}
              className="flex items-start gap-3 rounded-xl border border-gray-200 p-4"
            >
              <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-brand text-white">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <span className="text-ink">{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7 NHÓM PROMPT */}
      <section id="nhom" className="bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">
            7 nhóm prompt trong bộ
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {promptCategories.map((c) => (
              <Link
                key={c.slug}
                href="#thu-vien"
                className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-cardHover"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl" aria-hidden>
                    {c.emoji}
                  </span>
                  <span className="rounded-full bg-brand-light px-2.5 py-1 text-xs font-bold text-brand">
                    {c.prompts.length} prompt
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-ink">{c.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{c.desc}</p>
              </Link>
            ))}
            <div className="flex flex-col justify-center rounded-2xl border-2 border-dashed border-brand bg-brand-light p-5 text-center">
              <Gift className="mx-auto h-8 w-8 text-brand" />
              <p className="mt-2 font-bold text-ink">
                Tổng {totalPrompts} prompt
              </p>
              <p className="text-sm text-gray-600">Trọn bộ, dùng thoải mái</p>
            </div>
          </div>
        </div>
      </section>

      {/* HƯỚNG DẪN NHANH */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">
          Dùng thế nào?
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              n: 1,
              t: "Chọn prompt",
              d: "Lọc theo nhóm hoặc tìm từ khóa trong thư viện bên dưới.",
            },
            {
              n: 2,
              t: "Copy & điền",
              d: "Bấm Sao chép, thay các ô [...] bằng sản phẩm của bạn.",
            },
            {
              n: 3,
              t: "Dán vào AI",
              d: "Dán vào ChatGPT/Gemini/Midjourney... và nhận kết quả.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-xl border border-gray-200 p-5 text-center"
            >
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-brand text-lg font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-3 font-bold text-ink">{s.t}</h3>
              <p className="mt-1 text-sm text-gray-500">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THƯ VIỆN PROMPT */}
      <PromptLibrary />

      {/* CTA CUỐI */}
      <section className="bg-brand">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Bắt đầu kiếm tiền với AI ngay hôm nay
          </h2>
          <p className="mt-3 text-brand-light">
            {totalPrompts} prompt đang chờ bạn. Không cần đăng ký, không mất phí.
          </p>
          <Link
            href="#thu-vien"
            className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-brand transition hover:bg-brand-light"
          >
            Vào thư viện prompt
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-extrabold text-brand">{value}</div>
      <div className="mt-1 text-sm text-gray-500">{label}</div>
    </div>
  );
}
