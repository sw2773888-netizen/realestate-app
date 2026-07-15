import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { courses, categoryLabels } from "@/lib/data";
import { Category } from "@/lib/types";

export const metadata = {
  title: "Tất cả khóa học — Thanh Hương Academy",
  description:
    "Danh sách khóa học AI, TikTok và combo bán hàng do Thanh Hương giảng dạy.",
};

const tabs: { key: string; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "ai", label: categoryLabels.ai },
  { key: "tiktok", label: categoryLabels.tiktok },
  { key: "combo", label: categoryLabels.combo },
];

export default function CoursesPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const active = searchParams.cat ?? "all";
  const filtered =
    active === "all"
      ? courses
      : courses.filter((c) => c.category === (active as Category));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
          Khóa học của Thanh Hương
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-500">
          Chọn khóa học phù hợp với mục tiêu của bạn — từ nền tảng AI đến bán
          hàng bùng nổ trên TikTok.
        </p>
      </div>

      {/* Bộ lọc danh mục */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <Link
              key={t.key}
              href={t.key === "all" ? "/courses" : `/courses?cat=${t.key}`}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                isActive
                  ? "bg-brand-gradient text-white shadow-sm"
                  : "border border-gray-200 text-ink hover:border-brand hover:text-brand"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      {/* Danh sách khóa học */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-gray-500">
          Chưa có khóa học trong danh mục này.
        </p>
      )}
    </div>
  );
}
