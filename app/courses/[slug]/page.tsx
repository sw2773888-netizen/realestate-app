import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Clock,
  PlayCircle,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Infinity as InfinityIcon,
  MessageCircle,
} from "lucide-react";
import { getCourse, courses, categoryLabels } from "@/lib/data";
import { formatFullPrice, formatPrice, discountPercent } from "@/lib/format";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const course = getCourse(params.slug);
  if (!course) return { title: "Không tìm thấy khóa học" };
  return {
    title: `${course.title} — Thanh Hương Academy`,
    description: course.tagline,
  };
}

export default function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const course = getCourse(params.slug);
  if (!course) notFound();

  const off = discountPercent(course.price, course.oldPrice);
  const totalLessons = course.modules.reduce(
    (n, m) => n + m.lessons.length,
    0
  );

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Link
              href="/courses"
              className="text-sm font-semibold text-white/60 hover:text-white"
            >
              ← Tất cả khóa học
            </Link>
            <span className="mt-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
              {categoryLabels[course.category]}
            </span>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              {course.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <span className="flex items-center gap-1.5 font-semibold text-amber-300">
                <Star className="h-4 w-4 fill-amber-300" /> {course.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1.5 text-white/70">
                <Users className="h-4 w-4" />{" "}
                {course.students.toLocaleString("vi-VN")} học viên
              </span>
              <span className="flex items-center gap-1.5 text-white/70">
                <Clock className="h-4 w-4" /> {course.durationHours} giờ
              </span>
              <span className="flex items-center gap-1.5 text-white/70">
                <PlayCircle className="h-4 w-4" /> {course.lessonsCount} bài học
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                {course.level}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3">
        {/* ===== NỘI DUNG CHÍNH ===== */}
        <div className="space-y-12 lg:col-span-2">
          {/* Giới thiệu */}
          <section>
            <h2 className="text-2xl font-extrabold text-ink">
              Giới thiệu khóa học
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              {course.description}
            </p>
          </section>

          {/* Bạn sẽ đạt được */}
          <section>
            <h2 className="text-2xl font-extrabold text-ink">
              Bạn sẽ đạt được gì?
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <div key={o} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span className="text-gray-700">{o}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Nội dung khóa học */}
          <section>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-extrabold text-ink">
                Nội dung khóa học
              </h2>
              <span className="text-sm text-gray-500">
                {course.modules.length} chương · {totalLessons} bài
              </span>
            </div>
            <div className="mt-5 space-y-4">
              {course.modules.map((m) => (
                <div
                  key={m.title}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card"
                >
                  <div className="bg-gray-50 px-5 py-4 font-bold text-ink">
                    {m.title}
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {m.lessons.map((l) => (
                      <li
                        key={l.title}
                        className="flex items-center justify-between gap-4 px-5 py-3.5"
                      >
                        <span className="flex items-center gap-3 text-sm text-gray-700">
                          <PlayCircle className="h-4 w-4 shrink-0 text-brand" />
                          {l.title}
                        </span>
                        <span className="shrink-0 text-xs text-gray-400">
                          {l.duration}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Dành cho ai */}
          <section>
            <h2 className="text-2xl font-extrabold text-ink">
              Khóa học dành cho ai?
            </h2>
            <ul className="mt-5 space-y-3">
              {course.audience.map((a) => (
                <li key={a} className="flex items-center gap-3 text-gray-700">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-light text-brand">
                    ✓
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ===== THẺ ĐĂNG KÝ (sticky) ===== */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 rounded-3xl border border-gray-100 bg-white p-6 shadow-cardHover">
            <div className="flex items-end gap-3">
              <span className="text-3xl font-extrabold text-ink">
                {formatFullPrice(course.price)}
              </span>
            </div>
            {course.oldPrice && (
              <div className="mt-1 flex items-center gap-2">
                <span className="text-gray-400 line-through">
                  {formatFullPrice(course.oldPrice)}
                </span>
                {off > 0 && (
                  <span className="rounded-full bg-brand-light px-2 py-0.5 text-xs font-extrabold text-brand">
                    Tiết kiệm {off}%
                  </span>
                )}
              </div>
            )}

            <Link
              href={`/register?course=${course.slug}`}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-brand-gradient py-3.5 font-bold text-white shadow-lg transition hover:opacity-90"
            >
              Đăng ký học ngay <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#"
              className="mt-3 flex items-center justify-center gap-2 rounded-full border border-gray-200 py-3 font-bold text-ink transition hover:border-brand hover:text-brand"
            >
              <MessageCircle className="h-4 w-4" /> Tư vấn qua Zalo
            </a>

            <ul className="mt-6 space-y-3 border-t border-gray-100 pt-6 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <InfinityIcon className="h-4 w-4 text-brand" /> Truy cập trọn đời
              </li>
              <li className="flex items-center gap-3">
                <PlayCircle className="h-4 w-4 text-brand" /> {course.lessonsCount}{" "}
                bài học video
              </li>
              <li className="flex items-center gap-3">
                <Users className="h-4 w-4 text-brand" /> Cộng đồng hỗ trợ riêng
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-brand" /> Hoàn tiền trong 7
                ngày
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* ===== KHÓA HỌC KHÁC ===== */}
      <section className="border-t border-gray-100 bg-gray-50 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold text-ink">
            Chưa chắc khóa nào phù hợp?
          </h2>
          <p className="mt-3 text-gray-500">
            Để lại thông tin, Thanh Hương sẽ tư vấn lộ trình phù hợp nhất cho bạn.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-bold text-white"
          >
            Nhận tư vấn miễn phí <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
