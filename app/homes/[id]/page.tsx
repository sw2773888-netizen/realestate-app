import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Bed,
  Bath,
  Maximize,
  Calendar,
  MapPin,
  Phone,
  Building2,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import { getPropertyById, properties } from "@/lib/data";
import { formatPriceLabel, formatFullPrice } from "@/lib/format";
import Gallery from "@/components/Gallery";
import MortgageCalculator from "@/components/MortgageCalculator";
import FavoriteButton from "@/components/FavoriteButton";
import PropertyCard from "@/components/PropertyCard";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const property = getPropertyById(params.id);
  if (!property) notFound();

  const similar = properties
    .filter((p) => p.id !== property.id && p.city === property.city)
    .slice(0, 3);

  const stats = [
    { icon: Bed, label: "Phòng ngủ", value: property.beds || "—" },
    { icon: Bath, label: "Phòng tắm", value: property.baths || "—" },
    { icon: Maximize, label: "Diện tích", value: `${property.area} m²` },
    {
      icon: Calendar,
      label: "Năm xây",
      value: property.yearBuilt || "—",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Link
        href="/homes"
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
      >
        <ChevronLeft className="h-4 w-4" /> Quay lại danh sách
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cột chính */}
        <div className="lg:col-span-2">
          <Gallery images={property.images} alt={property.title} />

          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <div className="text-3xl font-extrabold text-ink">
                {formatPriceLabel(property)}
              </div>
              <h1 className="mt-1 text-xl font-bold text-ink">
                {property.title}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-gray-500">
                <MapPin className="h-4 w-4" />
                {property.address}, {property.district}, {property.city}
              </p>
            </div>
            <div className="rounded-full border border-gray-200 p-2.5">
              <FavoriteButton id={property.id} size={24} className="text-gray-400" />
            </div>
          </div>

          {/* Thông số */}
          <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-gray-200 p-5 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto h-6 w-6 text-brand" />
                <div className="mt-1.5 text-lg font-bold text-ink">
                  {s.value}
                </div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Mô tả */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-ink">Mô tả</h2>
            <p className="mt-3 leading-relaxed text-gray-700">
              {property.description}
            </p>
          </section>

          {/* Tiện ích */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-ink">Tiện ích & Đặc điểm</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {property.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-brand" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* Bản đồ minh họa */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-ink">Vị trí</h2>
            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200">
              <iframe
                title="Bản đồ"
                className="h-72 w-full"
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                  property.lng - 0.01
                }%2C${property.lat - 0.008}%2C${property.lng + 0.01}%2C${
                  property.lat + 0.008
                }&layer=mapnik&marker=${property.lat}%2C${property.lng}`}
              />
            </div>
          </section>
        </div>

        {/* Cột phụ - liên hệ + máy tính vay */}
        <div className="space-y-6">
          <div className="sticky top-20 space-y-6">
            {/* Liên hệ môi giới */}
            <div className="rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-light text-lg font-bold text-brand">
                  {property.agent.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-ink">
                    {property.agent.name}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Building2 className="h-3.5 w-3.5" />
                    {property.agent.company}
                  </div>
                </div>
              </div>
              <a
                href={`tel:${property.agent.phone.replace(/\s/g, "")}`}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 font-semibold text-white transition hover:bg-brand-dark"
              >
                <Phone className="h-4 w-4" /> {property.agent.phone}
              </a>
              <button className="mt-3 w-full rounded-lg border-2 border-brand py-2.5 font-semibold text-brand transition hover:bg-brand-light">
                Đặt lịch xem nhà
              </button>
              <p className="mt-3 text-center text-xs text-gray-400">
                Đăng {property.daysOnMarket} ngày trước
              </p>
            </div>

            {property.listingType === "sale" && (
              <MortgageCalculator price={property.price} />
            )}
          </div>
        </div>
      </div>

      {/* Bất động sản tương tự */}
      {similar.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold text-ink">
            Bất động sản tương tự
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
