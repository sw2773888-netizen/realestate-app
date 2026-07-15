import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="text-7xl font-black text-gradient">404</div>
      <h1 className="mt-4 text-2xl font-bold text-ink">Không tìm thấy trang</h1>
      <p className="mt-2 text-gray-500">
        Trang hoặc khóa học bạn tìm không tồn tại hoặc đã được chuyển đi.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand-gradient px-6 py-3 font-bold text-white"
        >
          Về trang chủ
        </Link>
        <Link
          href="/courses"
          className="rounded-full border border-gray-200 px-6 py-3 font-bold text-ink transition hover:border-brand hover:text-brand"
        >
          Xem khóa học
        </Link>
      </div>
    </div>
  );
}
