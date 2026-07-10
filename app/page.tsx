import Link from "next/link";
import { Search, Home as HomeIcon, Key, DollarSign } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { properties, cities } from "@/lib/data";

export default function HomePage() {
  const featured = properties.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div
          className="relative flex min-h-[520px] items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          <div className="w-full max-w-2xl px-4 text-center">
            <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow sm:text-5xl">
              Nhà bán. Nhà thuê.
              <br />
              Môi giới. Khoản vay.
            </h1>
            <p className="mt-4 text-lg font-medium text-white/90 drop-shadow">
              Tìm ngôi nhà mơ ước của bạn trên khắp Việt Nam.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <SearchBar large />
            </div>
          </div>
        </div>
      </section>

      {/* Danh mục nhanh */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <ActionCard
            icon={<HomeIcon className="h-8 w-8" />}
            title="Mua nhà"
            desc="Khám phá hàng nghìn bất động sản đang được rao bán với đầy đủ thông tin và hình ảnh."
            cta="Xem nhà bán"
            href="/homes?type=sale"
          />
          <ActionCard
            icon={<Key className="h-8 w-8" />}
            title="Thuê nhà"
            desc="Từ căn hộ studio đến nhà phố nguyên căn — tìm nơi ở phù hợp với ngân sách của bạn."
            cta="Xem nhà cho thuê"
            href="/homes?type=rent"
          />
          <ActionCard
            icon={<DollarSign className="h-8 w-8" />}
            title="Bán nhà"
            desc="Đăng tin và kết nối với người mua tiềm năng. Chúng tôi giúp bạn bán nhanh, giá tốt."
            cta="Đăng bán nhà"
            href="/sell"
          />
        </div>
      </section>

      {/* Bất động sản nổi bật */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                Bất động sản nổi bật
              </h2>
              <p className="mt-1 text-gray-500">
                Những căn nhà được quan tâm nhiều nhất tuần này
              </p>
            </div>
            <Link
              href="/homes"
              className="hidden items-center gap-1 text-sm font-semibold text-brand hover:underline sm:flex"
            >
              Xem tất cả <Search className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/homes"
              className="inline-block rounded-lg bg-brand px-6 py-2.5 font-semibold text-white"
            >
              Xem tất cả bất động sản
            </Link>
          </div>
        </div>
      </section>

      {/* Khám phá theo thành phố */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          Khám phá theo khu vực
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {cities.map((c) => (
            <Link
              key={c}
              href={`/homes?q=${encodeURIComponent(c)}`}
              className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-brand hover:bg-brand-light hover:text-brand"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  desc,
  cta,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-card transition hover:shadow-cardHover">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-light text-brand">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-gray-500">{desc}</p>
      <Link
        href={href}
        className="mt-5 inline-block rounded-lg border-2 border-brand px-5 py-2 font-semibold text-brand transition hover:bg-brand hover:text-white"
      >
        {cta}
      </Link>
    </div>
  );
}
