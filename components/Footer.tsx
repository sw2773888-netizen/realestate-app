import Link from "next/link";
import { Sparkles, Facebook, Phone, Music2 } from "lucide-react";
import { BRAND } from "@/lib/data";

const cols = [
  {
    title: "Khóa học",
    links: [
      { label: "Khóa học AI", href: "/courses?cat=ai" },
      { label: "Khóa học TikTok", href: "/courses?cat=tiktok" },
      { label: "Combo AI + TikTok", href: "/courses?cat=combo" },
      { label: "Tất cả khóa học", href: "/courses" },
    ],
  },
  {
    title: "Về chúng tôi",
    links: [
      { label: "Về Thanh Hương", href: "/about" },
      { label: "Lộ trình học", href: "/#lo-trinh" },
      { label: "Cảm nhận học viên", href: "/#cam-nhan" },
      { label: "Câu hỏi thường gặp", href: "/#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white">
                <Sparkles className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="text-xl font-extrabold">
                Thanh Hương <span className="text-gradient">Academy</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Nơi bạn học AI ứng dụng và xây kênh TikTok bán hàng bài bản, thực
              chiến cùng Thanh Hương. Học là làm được.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={BRAND.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Music2 className="h-4 w-4" />
              </a>
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-bold">{c.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/60 transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> Zalo: {BRAND.zalo}
            </span>
            <a
              href={BRAND.tiktok}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Music2 className="h-4 w-4" /> TikTok: {BRAND.tiktokHandle}
            </a>
          </div>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {BRAND.name}. Nội dung mang tính minh
            họa.
          </p>
        </div>
      </div>
    </footer>
  );
}
