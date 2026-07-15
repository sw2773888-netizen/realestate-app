import Link from "next/link";
import {
  Sparkles,
  Bot,
  Video,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Star,
  ShieldCheck,
  Users,
  PlayCircle,
  Trophy,
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import Faq from "@/components/Faq";
import { courses, testimonials, faqs, BRAND } from "@/lib/data";

export default function HomePage() {
  const featured = courses.filter((c) => c.featured);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-grape/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-brand/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-cyan" /> Học cùng Thanh Hương
            </span>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Làm chủ <span className="text-gradient">AI &amp; TikTok</span>
              <br />
              Bứt phá thu nhập
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/70">
              Lộ trình thực chiến giúp bạn ứng dụng AI vào công việc và xây kênh
              TikTok bán hàng — kể cả khi bạn bắt đầu từ con số 0.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-bold text-white shadow-lg transition hover:opacity-90"
              >
                Khám phá khóa học <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                Đăng ký tư vấn miễn phí
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
              <Stat value="11.000+" label="Học viên" />
              <Stat value="4.9/5" label="Đánh giá" />
              <Stat value="100%" label="Học online trọn đời" />
            </div>
          </div>

          {/* Card nổi bật */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="rounded-2xl bg-brand-gradient p-6">
                <p className="text-sm font-semibold text-white/80">
                  Khóa học bán chạy nhất
                </p>
                <h3 className="mt-1 text-2xl font-extrabold text-white">
                  Combo AI + TikTok Toàn Diện
                </h3>
                <div className="mt-4 flex items-center gap-1 text-sm text-white">
                  <Star className="h-4 w-4 fill-white" /> 5.0 · 96 bài học · 18
                  giờ
                </div>
              </div>
              <ul className="mt-5 space-y-3">
                {[
                  "Dùng AI sản xuất video TikTok gấp 10 lần",
                  "Xây hệ thống nội dung tự động mỗi ngày",
                  "Cộng đồng riêng & hỗ trợ 1-1",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href="/courses/ai-tiktok-combo"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white py-3 font-bold text-ink transition hover:bg-white/90"
              >
                Xem khóa combo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TẠI SAO HỌC ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Vì sao chọn học tại đây?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Không lý thuyết suông. Mỗi bài học đều đi kèm ví dụ và bài tập thực
            hành để bạn làm được ngay.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Feature
            icon={<Bot className="h-7 w-7" />}
            title="Học thực chiến"
            desc="Nội dung cập nhật liên tục theo xu hướng AI và TikTok mới nhất, áp dụng được ngay vào công việc."
          />
          <Feature
            icon={<Video className="h-7 w-7" />}
            title="Dễ hiểu cho người mới"
            desc="Giảng từng bước bằng tiếng Việt, không cần biết công nghệ hay lập trình vẫn theo kịp."
          />
          <Feature
            icon={<Rocket className="h-7 w-7" />}
            title="Đồng hành lâu dài"
            desc="Cộng đồng học viên, hỗ trợ giải đáp và truy cập trọn đời mọi bản cập nhật của khóa học."
          />
        </div>
      </section>

      {/* ===== KHÓA HỌC NỔI BẬT ===== */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
                Khóa học nổi bật
              </h2>
              <p className="mt-2 text-gray-500">
                Được hàng nghìn học viên tin tưởng lựa chọn
              </p>
            </div>
            <Link
              href="/courses"
              className="hidden items-center gap-1 text-sm font-bold text-brand hover:underline sm:flex"
            >
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/courses"
              className="inline-block rounded-full bg-brand-gradient px-6 py-3 font-bold text-white"
            >
              Xem tất cả khóa học
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LỘ TRÌNH ===== */}
      <section id="lo-trinh" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Lộ trình 4 bước đến thành công
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Đi từ nền tảng đến vận hành một mô hình kinh doanh của riêng bạn.
          </p>
        </div>
        <div className="mt-12 space-y-6">
          {[
            {
              icon: <Bot className="h-6 w-6" />,
              step: "Bước 1",
              title: "Làm quen & làm chủ AI",
              desc: "Sử dụng ChatGPT và các công cụ AI để tăng tốc mọi việc bạn làm.",
            },
            {
              icon: <Video className="h-6 w-6" />,
              step: "Bước 2",
              title: "Xây kênh TikTok",
              desc: "Chọn ngách, quay dựng và hiểu thuật toán để lên xu hướng.",
            },
            {
              icon: <Trophy className="h-6 w-6" />,
              step: "Bước 3",
              title: "Bán hàng & kiếm tiền",
              desc: "Biến người xem thành khách hàng qua TikTok Shop và affiliate.",
            },
            {
              icon: <Rocket className="h-6 w-6" />,
              step: "Bước 4",
              title: "Tự động hóa & nhân bản",
              desc: "Kết hợp AI + TikTok để vận hành mô hình một người hiệu quả.",
            },
          ].map((s, i) => (
            <div
              key={s.step}
              className="flex items-start gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-card"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white">
                {s.icon}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-brand">
                  {s.step}
                </span>
                <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
              </div>
              <span className="ml-auto hidden text-4xl font-black text-gray-100 sm:block">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GIẢNG VIÊN ===== */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div className="relative mx-auto flex h-72 w-72 items-center justify-center rounded-3xl bg-brand-gradient sm:h-80 sm:w-80">
            <span className="text-8xl font-black text-white/90">TH</span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-5 py-2 text-sm font-bold text-ink shadow-card">
              👩‍🏫 Giảng viên Thanh Hương
            </span>
          </div>
          <div>
            <span className="text-sm font-bold uppercase tracking-wide text-brand">
              Người đồng hành
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
              Xin chào, mình là Thanh Hương
            </h2>
            <p className="mt-4 text-gray-600">
              Mình là nhà sáng tạo nội dung và người kinh doanh online, đã giúp
              hàng nghìn học viên ứng dụng AI và xây kênh TikTok bán hàng thành
              công. Sứ mệnh của mình là giúp bạn học nhanh, làm được và tạo ra thu
              nhập thật.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "11.000+ học viên trên khắp Việt Nam",
                "Nhiều video triệu view & chiến dịch bán hàng thực tế",
                "Phương pháp cầm tay chỉ việc, dễ áp dụng",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-brand" /> {t}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 font-bold text-brand hover:underline"
            >
              Tìm hiểu thêm về Thanh Hương <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CẢM NHẬN ===== */}
      <section id="cam-nhan" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Học viên nói gì?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Những kết quả thật từ những người đã học và hành động.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-card"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm text-gray-600">“{t.quote}”</p>
              <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                  {t.avatar}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              Câu hỏi thường gặp
            </h2>
            <p className="mt-3 text-gray-500">
              Còn thắc mắc? Nhắn Zalo {BRAND.zalo} để được tư vấn nhé.
            </p>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <Faq key={f.q} faq={f} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA CUỐI ===== */}
      <section className="relative overflow-hidden bg-ink py-20 text-white">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-grape/40 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Sẵn sàng bứt phá cùng AI &amp; TikTok?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Bắt đầu hành trình của bạn ngay hôm nay. Cam kết hoàn tiền 100% trong
            7 ngày nếu không hài lòng.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-8 py-3.5 font-bold text-white shadow-lg transition hover:opacity-90"
            >
              Đăng ký học ngay <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 font-bold text-white transition hover:bg-white/10"
            >
              Xem các khóa học
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan" /> Hoàn tiền 7 ngày
            </span>
            <span className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-cyan" /> Truy cập trọn đời
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-cyan" /> Cộng đồng hỗ trợ
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-extrabold text-white">{value}</p>
      <p className="text-white/60">{label}</p>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-card transition hover:shadow-cardHover">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{desc}</p>
    </div>
  );
}
