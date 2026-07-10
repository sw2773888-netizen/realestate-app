import { Property } from "./types";

/** Định dạng giá VND sang dạng tỷ / triệu dễ đọc. */
export function formatPrice(value: number): string {
  if (value >= 1_000_000_000) {
    const ty = value / 1_000_000_000;
    return `${ty % 1 === 0 ? ty : ty.toFixed(1)} tỷ`;
  }
  if (value >= 1_000_000) {
    const trieu = value / 1_000_000;
    return `${trieu % 1 === 0 ? trieu : trieu.toFixed(1)} triệu`;
  }
  return value.toLocaleString("vi-VN") + " đ";
}

export function formatPriceLabel(p: Property): string {
  return p.listingType === "rent"
    ? `${formatPrice(p.price)}/tháng`
    : formatPrice(p.price);
}

export function formatFullPrice(value: number): string {
  return value.toLocaleString("vi-VN") + " đ";
}
