/** Định dạng giá VND sang dạng triệu / nghìn dễ đọc. */
export function formatPrice(value: number): string {
  if (value === 0) return "Miễn phí";
  if (value >= 1_000_000) {
    const trieu = value / 1_000_000;
    return `${trieu % 1 === 0 ? trieu : trieu.toFixed(1)}tr`;
  }
  return value.toLocaleString("vi-VN") + "đ";
}

/** Giá đầy đủ: 1.990.000 đ */
export function formatFullPrice(value: number): string {
  if (value === 0) return "Miễn phí";
  return value.toLocaleString("vi-VN") + " đ";
}

/** Phần trăm giảm giá giữa giá gốc và giá bán. */
export function discountPercent(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
