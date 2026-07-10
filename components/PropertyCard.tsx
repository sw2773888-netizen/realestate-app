import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize } from "lucide-react";
import { Property } from "@/lib/types";
import { formatPriceLabel } from "@/lib/format";
import FavoriteButton from "./FavoriteButton";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/homes/${property.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-card transition hover:shadow-cardHover"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {property.isNew && (
            <span className="rounded-md bg-brand px-2 py-1 text-xs font-bold text-white">
              MỚI
            </span>
          )}
          <span className="rounded-md bg-black/70 px-2 py-1 text-xs font-bold text-white">
            {property.listingType === "rent" ? "Cho thuê" : "Bán"}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <FavoriteButton id={property.id} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="text-xl font-extrabold text-ink">
          {formatPriceLabel(property)}
        </div>

        <div className="mt-2 flex items-center gap-3 text-sm text-gray-700">
          {property.beds > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-gray-500" /> {property.beds} PN
            </span>
          )}
          {property.baths > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-gray-500" /> {property.baths} WC
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize className="h-4 w-4 text-gray-500" /> {property.area} m²
          </span>
        </div>

        <p className="mt-2 line-clamp-1 text-sm font-semibold text-ink">
          {property.title}
        </p>
        <p className="mt-0.5 line-clamp-1 text-sm text-gray-500">
          {property.address}, {property.district}
        </p>
        <p className="mt-auto pt-2 text-xs uppercase tracking-wide text-gray-400">
          {property.homeType} · {property.city}
        </p>
      </div>
    </Link>
  );
}
