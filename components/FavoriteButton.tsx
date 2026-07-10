"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "./FavoritesProvider";

export default function FavoriteButton({
  id,
  className = "",
  size = 20,
}: {
  id: string;
  className?: string;
  size?: number;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      aria-label={active ? "Bỏ lưu" : "Lưu nhà"}
      className={`grid place-items-center rounded-full transition ${className}`}
    >
      <Heart
        style={{ width: size, height: size }}
        className={
          active ? "fill-red-500 text-red-500" : "text-white drop-shadow"
        }
        strokeWidth={2.5}
      />
    </button>
  );
}
