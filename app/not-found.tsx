import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="text-7xl font-extrabold text-brand">404</div>
      <h1 className="mt-4 text-2xl font-bold text-ink">
        Không tìm thấy trang
      </h1>
      <p className="mt-2 text-gray-500">
        Bất động sản hoặc trang bạn tìm không tồn tại hoặc đã bị gỡ.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-brand px-6 py-2.5 font-semibold text-white"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
