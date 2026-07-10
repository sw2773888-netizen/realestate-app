import Link from "next/link";
import { Home } from "lucide-react";

const cols = [
  {
    title: "Về Zola",
    links: ["Giới thiệu", "Tuyển dụng", "Báo chí", "Blog bất động sản"],
  },
  {
    title: "Dịch vụ",
    links: ["Mua nhà", "Cho thuê", "Bán nhà", "Vay thế chấp", "Định giá nhà"],
  },
  {
    title: "Hỗ trợ",
    links: ["Trung tâm trợ giúp", "Liên hệ", "Điều khoản", "Bảo mật"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-brand">
              <Home className="h-6 w-6" strokeWidth={2.5} />
              <span className="text-xl font-extrabold text-ink">Zola.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-gray-500">
              Nền tảng bất động sản giúp bạn mua, thuê và bán nhà dễ dàng hơn.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-bold text-ink">{c.title}</h3>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <span className="cursor-pointer text-sm text-gray-500 hover:text-brand">
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Zola Real Estate. Dữ liệu mang tính minh
          họa. Không phải sản phẩm thương mại thật.
        </div>
      </div>
    </footer>
  );
}
