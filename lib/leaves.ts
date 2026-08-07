// Hệ hạt "lá thu rơi" cho hiệu ứng mùa thu Hà Nội.
// Lá bay chéo, xoay nhẹ, lắc lư như gió heo may.

export interface Leaf {
  x: number; // 0..1 theo chiều rộng
  y: number; // 0..1 theo chiều cao
  size: number; // px cơ sở (theo min cạnh)
  speed: number; // tốc độ rơi
  drift: number; // biên độ lắc ngang
  phase: number; // pha lắc
  rot: number; // góc xoay hiện tại
  spin: number; // tốc độ xoay
  color: string;
  shape: number; // 0 lá đơn, 1 lá phong 3 thuỳ
}

const AUTUMN_COLORS = [
  "#d98324", // cam đất
  "#e6a23c", // vàng nghệ
  "#c0392b", // đỏ gạch
  "#b5651d", // nâu vàng
  "#f2c14e", // vàng nắng
  "#a0522d", // nâu đỏ
];

const rand = (a: number, b: number) => a + Math.random() * (b - a);

export function createLeaves(count: number): Leaf[] {
  const leaves: Leaf[] = [];
  for (let i = 0; i < count; i++) {
    leaves.push({
      x: Math.random(),
      y: Math.random(),
      size: rand(0.018, 0.05),
      speed: rand(0.0006, 0.0018),
      drift: rand(0.02, 0.06),
      phase: rand(0, Math.PI * 2),
      rot: rand(0, Math.PI * 2),
      spin: rand(-0.03, 0.03),
      color: AUTUMN_COLORS[(Math.random() * AUTUMN_COLORS.length) | 0],
      shape: Math.random() < 0.5 ? 0 : 1,
    });
  }
  return leaves;
}

/** Cập nhật vị trí lá 1 khung hình. dt ~ số khung (mặc định 1). */
export function updateLeaves(leaves: Leaf[], dt = 1): void {
  for (const l of leaves) {
    l.y += l.speed * dt;
    l.phase += 0.02 * dt;
    l.rot += l.spin * dt;
    if (l.y > 1.08) {
      l.y = -0.08;
      l.x = Math.random();
    }
  }
}

function leafPath(ctx: CanvasRenderingContext2D, s: number, shape: number) {
  if (shape === 0) {
    // Lá đơn hình bầu dục có cuống + gân giữa
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.7, -s * 0.5, s * 0.7, s * 0.5, 0, s);
    ctx.bezierCurveTo(-s * 0.7, s * 0.5, -s * 0.7, -s * 0.5, 0, -s);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(60,30,0,0.35)";
    ctx.lineWidth = Math.max(0.6, s * 0.08);
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(0, s * 1.25);
    ctx.stroke();
  } else {
    // Lá phong cách điệu 3 thuỳ
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.35, -s * 0.15);
    ctx.lineTo(s, -s * 0.1);
    ctx.lineTo(s * 0.45, s * 0.25);
    ctx.lineTo(s * 0.7, s);
    ctx.lineTo(0, s * 0.55);
    ctx.lineTo(-s * 0.7, s);
    ctx.lineTo(-s * 0.45, s * 0.25);
    ctx.lineTo(-s, -s * 0.1);
    ctx.lineTo(-s * 0.35, -s * 0.15);
    ctx.closePath();
    ctx.fill();
  }
}

/** Vẽ toàn bộ lá lên canvas kích thước w×h. */
export function drawLeaves(ctx: CanvasRenderingContext2D, leaves: Leaf[], w: number, h: number): void {
  const base = Math.min(w, h);
  for (const l of leaves) {
    const px = l.x * w + Math.sin(l.phase) * l.drift * w;
    const py = l.y * h;
    const s = l.size * base;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(l.rot + Math.sin(l.phase) * 0.4);
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = l.color;
    ctx.shadowColor = "rgba(90,45,0,0.25)";
    ctx.shadowBlur = s * 0.4;
    leafPath(ctx, s, l.shape);
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

/** Vẽ khung chữ "Mùa thu Hà Nội" ở đáy ảnh. */
export function drawCaption(ctx: CanvasRenderingContext2D, w: number, h: number, text: string): void {
  const pad = Math.round(Math.min(w, h) * 0.045);
  const fs = Math.max(18, Math.round(Math.min(w, h) * 0.052));

  // Dải mờ tối dần ở đáy để chữ nổi
  const grad = ctx.createLinearGradient(0, h - fs * 3.2, 0, h);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(20,8,0,0.55)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, h - fs * 3.2, w, fs * 3.2);

  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.font = `700 ${fs}px Georgia, 'Times New Roman', serif`;
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = fs * 0.25;
  ctx.fillStyle = "#ffe9c2";
  ctx.fillText(text, pad, h - pad);

  // Đường kẻ trang trí phía trên chữ
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255,213,150,0.8)";
  ctx.lineWidth = Math.max(1.5, fs * 0.05);
  ctx.beginPath();
  ctx.moveTo(pad, h - pad - fs * 1.35);
  ctx.lineTo(pad + fs * 2.4, h - pad - fs * 1.35);
  ctx.stroke();
}
