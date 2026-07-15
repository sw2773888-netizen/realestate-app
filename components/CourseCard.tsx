import Link from "next/link";
import { Star, Clock, PlayCircle, Users } from "lucide-react";
import { Course } from "@/lib/types";
import { formatPrice, discountPercent } from "@/lib/format";
import { categoryLabels } from "@/lib/data";

const gradients: Record<string, string> = {
  ai: "from-grape to-brand",
  tiktok: "from-brand to-cyan",
  combo: "from-grape via-brand to-cyan",
};

export default function CourseCard({ course }: { course: Course }) {
  const off = discountPercent(course.price, course.oldPrice);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-cardHover"
    >
      {/* Ảnh bìa gradient */}
      <div
        className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${
          gradients[course.category]
        } p-6`}
      >
        <span className="absolute left-3 top-3 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          {categoryLabels[course.category]}
        </span>
        {off > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-brand">
            -{off}%
          </span>
        )}
        <h3 className="text-center text-xl font-extrabold leading-snug text-white drop-shadow">
          {course.title}
        </h3>
      </div>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {course.rating.toFixed(1)}
          <span className="ml-1 font-normal text-gray-400">
            · {course.students.toLocaleString("vi-VN")} học viên
          </span>
        </div>

        <p className="mt-2 flex-1 text-sm text-gray-500">{course.tagline}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {course.durationHours} giờ
          </span>
          <span className="flex items-center gap-1">
            <PlayCircle className="h-3.5 w-3.5" /> {course.lessonsCount} bài
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {course.level}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
          <div>
            <span className="text-xl font-extrabold text-ink">
              {formatPrice(course.price)}
            </span>
            {course.oldPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                {formatPrice(course.oldPrice)}
              </span>
            )}
          </div>
          <span className="rounded-full bg-brand-light px-3 py-1.5 text-xs font-bold text-brand transition group-hover:bg-brand group-hover:text-white">
            Xem chi tiết
          </span>
        </div>
      </div>
    </Link>
  );
}
