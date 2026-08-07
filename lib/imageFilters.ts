// Thư viện xử lý ảnh chạy hoàn toàn trên trình duyệt (Canvas API).
// Gồm 2 nhóm hiệu ứng chính:
//  1) Làm đẹp khuôn mặt gốc: làm mịn da có bảo toàn chi tiết (mắt, tóc, môi) + sáng da.
//  2) Grade "mùa thu Hà Nội": tông nắng vàng ấm, tăng sắc cam, vignette.

export interface BeautifyParams {
  smoothing: number; // 0..100 — mức làm mịn da
  glow: number; // 0..100 — làm sáng/hồng hào da
}

export interface AutumnParams {
  warmth: number; // 0..100 — độ ấm (vàng/cam)
  intensity: number; // 0..100 — cường độ ánh nắng vàng
  saturation: number; // 0..100 — độ rực của màu
  vignette: number; // 0..100 — tối 4 góc
}

const clamp = (v: number, lo = 0, hi = 255) => (v < lo ? lo : v > hi ? hi : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/** Box blur tách trục (nhanh), 3 lần lặp để xấp xỉ Gaussian. Bỏ qua alpha (ảnh mờ đục). */
function boxBlur(src: Uint8ClampedArray, w: number, h: number, radius: number): Uint8ClampedArray {
  if (radius < 1) return src.slice();
  let a = src.slice();
  let b = new Uint8ClampedArray(src.length);
  for (let pass = 0; pass < 3; pass++) {
    boxBlurH(a, b, w, h, radius);
    boxBlurV(b, a, w, h, radius);
  }
  return a;
}

function boxBlurH(src: Uint8ClampedArray, dst: Uint8ClampedArray, w: number, h: number, r: number) {
  const win = r * 2 + 1;
  for (let y = 0; y < h; y++) {
    const row = y * w * 4;
    for (let c = 0; c < 3; c++) {
      let sum = 0;
      // Khởi tạo cửa sổ với biên nhân bản
      for (let i = -r; i <= r; i++) {
        const x = Math.min(w - 1, Math.max(0, i));
        sum += src[row + x * 4 + c];
      }
      for (let x = 0; x < w; x++) {
        dst[row + x * 4 + c] = sum / win;
        const xOut = Math.min(w - 1, Math.max(0, x - r));
        const xIn = Math.min(w - 1, Math.max(0, x + r + 1));
        sum += src[row + xIn * 4 + c] - src[row + xOut * 4 + c];
      }
      dst[row + (w - 1) * 4 + 3] = 255;
    }
    for (let x = 0; x < w; x++) dst[row + x * 4 + 3] = 255;
  }
}

function boxBlurV(src: Uint8ClampedArray, dst: Uint8ClampedArray, w: number, h: number, r: number) {
  const win = r * 2 + 1;
  for (let x = 0; x < w; x++) {
    const col = x * 4;
    for (let c = 0; c < 3; c++) {
      let sum = 0;
      for (let i = -r; i <= r; i++) {
        const y = Math.min(h - 1, Math.max(0, i));
        sum += src[y * w * 4 + col + c];
      }
      for (let y = 0; y < h; y++) {
        dst[y * w * 4 + col + c] = sum / win;
        const yOut = Math.min(h - 1, Math.max(0, y - r));
        const yIn = Math.min(h - 1, Math.max(0, y + r + 1));
        sum += src[yIn * w * 4 + col + c] - src[yOut * w * 4 + col + c];
      }
    }
    for (let y = 0; y < h; y++) dst[y * w * 4 + col + 3] = 255;
  }
}

/**
 * Làm đẹp khuôn mặt GỐC: làm mịn da kiểu "surface blur".
 * Chỉ làm mịn ở vùng da phẳng (chênh lệch sáng nhỏ so với bản mờ),
 * giữ nguyên cạnh sắc nét như mắt, lông mày, tóc, viền môi.
 */
export function beautify(data: Uint8ClampedArray, w: number, h: number, p: BeautifyParams): void {
  const smooth = p.smoothing / 100;
  const glow = p.glow / 100;
  if (smooth <= 0 && glow <= 0) return;

  if (smooth > 0) {
    const radius = Math.max(1, Math.round((Math.min(w, h) / 260) * (0.5 + smooth * 1.5)));
    const blurred = boxBlur(data, w, h, radius);
    // Ngưỡng chênh lệch: chỉ mịn nơi khác biệt nhỏ (da), bỏ qua nơi khác biệt lớn (cạnh).
    const edge0 = 6;
    const edge1 = 26 + smooth * 24;
    for (let i = 0; i < data.length; i += 4) {
      const or = data[i], og = data[i + 1], ob = data[i + 2];
      const br = blurred[i], bg = blurred[i + 1], bb = blurred[i + 2];
      const lumO = 0.299 * or + 0.587 * og + 0.114 * ob;
      const lumB = 0.299 * br + 0.587 * bg + 0.114 * bb;
      const diff = Math.abs(lumO - lumB);
      // mask = 1 ở vùng phẳng, giảm dần về 0 ở cạnh
      const mask = 1 - smoothstep(edge0, edge1, diff);
      // ưu tiên vùng có tông da (đỏ > lam) để không làm mịn nền quá đà
      const skinBias = or > ob ? 1 : 0.5;
      const wgt = smooth * mask * skinBias;
      data[i] = clamp(lerp(or, br, wgt));
      data[i + 1] = clamp(lerp(og, bg, wgt));
      data[i + 2] = clamp(lerp(ob, bb, wgt));
    }
  }

  if (glow > 0) {
    // Sáng & hồng hào da: nâng vùng trung–sáng, thêm chút hồng cam, giữ vùng tối.
    const lift = glow * 0.18;
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i], g = data[i + 1], b = data[i + 2];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const w2 = smoothstep(0.25, 0.95, lum); // chỉ tác động vùng sáng vừa trở lên
      const amt = lift * w2;
      r = r + (255 - r) * amt * 1.0;
      g = g + (255 - g) * amt * 0.86;
      b = b + (255 - b) * amt * 0.72;
      data[i] = clamp(r);
      data[i + 1] = clamp(g);
      data[i + 2] = clamp(b);
    }
  }
}

const softLight = (base: number, blend: number) => {
  // Pegtop soft light, base & blend trong [0,1]
  return (1 - 2 * blend) * base * base + 2 * blend * base;
};

/** Grade "mùa thu Hà Nội": nắng vàng ấm, ngả cam, tăng tương phản nhẹ, tăng sắc. */
export function autumnGrade(data: Uint8ClampedArray, p: AutumnParams): void {
  const warmth = p.warmth / 100;
  const intensity = p.intensity / 100;
  const sat = p.saturation / 100;
  // Ánh nắng vàng mùa thu
  const gold = [1.0, 0.82, 0.5];
  const contrast = 1 + intensity * 0.14;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;

    // 1) Cân bằng trắng ấm: đẩy đỏ lên, hạ lam xuống, ngả vàng
    r = r + warmth * 0.12 * (1 - r);
    g = g + warmth * 0.05 * (1 - g);
    b = b - warmth * 0.14 * b;

    // 2) Phủ nắng vàng bằng soft light
    r = lerp(r, softLight(r, gold[0]), intensity * 0.55);
    g = lerp(g, softLight(g, gold[1]), intensity * 0.55);
    b = lerp(b, softLight(b, gold[2]), intensity * 0.55);

    // 3) Tương phản nhẹ quanh trung tính
    r = (r - 0.5) * contrast + 0.5;
    g = (g - 0.5) * contrast + 0.5;
    b = (b - 0.5) * contrast + 0.5;

    // 4) Tăng bão hoà (đẩy sắc cam/vàng rực hơn)
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const s = 1 + sat * 0.55;
    r = lum + (r - lum) * s;
    g = lum + (g - lum) * s;
    b = lum + (b - lum) * s;

    data[i] = clamp(r * 255);
    data[i + 1] = clamp(g * 255);
    data[i + 2] = clamp(b * 255);
  }
}

/** Tối 4 góc (vignette) tạo chiều sâu ảnh mùa thu. */
export function vignette(ctx: CanvasRenderingContext2D, w: number, h: number, amount: number): void {
  const a = amount / 100;
  if (a <= 0) return;
  const cx = w / 2, cy = h / 2;
  const r = Math.sqrt(cx * cx + cy * cy);
  const grad = ctx.createRadialGradient(cx, cy, r * 0.55, cx, cy, r);
  grad.addColorStop(0, "rgba(40,20,0,0)");
  grad.addColorStop(1, `rgba(35,15,0,${a * 0.6})`);
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  // Vệt nắng ấm nhẹ ở góc trên
  const sun = ctx.createRadialGradient(w * 0.78, h * 0.16, 0, w * 0.78, h * 0.16, r * 0.9);
  sun.addColorStop(0, `rgba(255,205,120,${a * 0.28})`);
  sun.addColorStop(1, "rgba(255,205,120,0)");
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}
