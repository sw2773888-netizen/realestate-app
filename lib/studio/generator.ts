import { INDUSTRIES, TONES } from "./industries";
import type { GenerateInput, ScriptBeat, ScriptResult } from "./types";

/** Bộ sinh số giả ngẫu nhiên có seed để "tạo lại" cho ra biến thể khác nhau nhưng ổn định */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generate(input: GenerateInput): ScriptResult {
  const ind = INDUSTRIES[input.industry];
  const tone = TONES[input.tone];
  const rnd = mulberry32(input.seed + input.industry.length * 7 + input.tone.length * 13);
  const pick = <T,>(arr: T[]): T => arr[Math.floor(rnd() * arr.length)];
  const pickN = <T,>(arr: T[], n: number): T[] => {
    const copy = [...arr];
    const out: T[] = [];
    while (out.length < n && copy.length) {
      out.push(copy.splice(Math.floor(rnd() * copy.length), 1)[0]);
    }
    return out;
  };

  const product = input.product.trim() || "sản phẩm này";
  const audience = input.audience.trim();
  const benefit = input.benefit.trim();
  const price = input.price.trim();

  const pain = pick(ind.painPoints);
  const benefitLine = benefit || pick(ind.benefits);
  const proof = pick(ind.proofs);
  const keyword = pick(ind.keywords);

  // ---- HOOK 3 GIÂY (nhiều lựa chọn) ----
  const audiencePrefix = audience ? `${capitalize(audience)} ơi, ` : "";
  const hookBank: Record<string, string[]> = {
    energetic: [
      `${audiencePrefix}KHOAN đã lướt! ${capitalize(product)} này đang gây bão vì ${benefitLine}!`,
      `Dừng tay 3 giây thôi: ${product} giúp bạn ${benefitLine} — xem hết kẻo tiếc!`,
      `Cái này viral không phải không có lý do đâu nha!`,
    ],
    friendly: [
      `${audiencePrefix}mình phải kể cho bạn nghe vụ ${product} này liền!`,
      `Bạn có đang ${pain} không? Mình từng y chang, tới khi gặp ${product}...`,
      `Nói thật nhỏ nhỏ thôi, ${product} này mình xài mê luôn á!`,
    ],
    honest: [
      `Review thật lòng: mình đã xài ${product} 2 tuần và đây là sự thật...`,
      `${audiencePrefix}đừng vội mua ${product} trước khi xem hết video này!`,
      `Mình bỏ tiền thật mua ${product} để review không thiên vị cho bạn.`,
    ],
    expert: [
      `90% người dùng sai cách nên mới ${pain}. Đây là giải pháp đúng.`,
      `Với kinh nghiệm trong ngành, mình chỉ bạn cách chọn ${product} chuẩn nhất.`,
      `${audiencePrefix}muốn hết cảnh ${pain}? Hiểu đúng 1 điều này là được.`,
    ],
    luxury: [
      `${capitalize(product)} — khi bạn xứng đáng với những gì tinh tế nhất.`,
      `Không phải ai cũng biết bí mật đằng sau ${benefitLine}.`,
      `Đẳng cấp không nằm ở giá tiền, mà ở ${keyword}.`,
    ],
    storytelling: [
      `Có một dạo mình gần như bỏ cuộc vì ${pain}...`,
      `Chuyện là hôm bữa mình ${pain}, rồi mọi thứ thay đổi khi...`,
      `${audiencePrefix}để mình kể bạn nghe vì sao mình đổi sang ${product}.`,
    ],
  };
  const hooks = pickN(
    [...hookBank[tone.id], ...hookBank.friendly, ...hookBank.energetic],
    3
  );

  // ---- KỊCH BẢN THEO TIMELINE ----
  const beats = buildBeats(input.duration, {
    product,
    pain,
    benefitLine,
    proof,
    keyword,
    price,
    hook: hooks[0],
    cta: pick(ind.ctas),
    tone: tone.id,
  });

  const voiceover = beats.map((b) => b.voiceover).join(" ");

  // ---- CTA ----
  const cta = pick(ind.ctas) + (price ? ` Chỉ ${price} thôi đó!` : "");

  // ---- CAPTION ----
  const captionBank = [
    `${ind.emoji} ${capitalize(product)} — ${benefitLine}. ${audience ? `Đặc biệt hợp với ${audience}. ` : ""}Ai cần thì để lại "1" nha! 👇`,
    `Thử một lần là ghiền: ${product} giúp bạn ${benefitLine} 😍 ${proof}. Link ngay dưới video!`,
    `Đừng để ${pain} nữa nhé 🥹 ${capitalize(product)} chính là thứ bạn đang tìm. Chốt đơn thôi!`,
    `${capitalize(product)} đang hot lắm nha mọi người 🔥 ${benefitLine}${price ? `, chỉ ${price}` : ""}. Lướt xuống bấm giỏ hàng nè!`,
  ];
  const caption = pick(captionBank);

  // ---- HASHTAG ----
  const productTag = slugTag(product);
  const base = ["fyp", "xuhuong", "tiktokshop", "review"];
  const hashtags = uniq([
    ...(productTag ? [productTag] : []),
    ...pickN(ind.hashtags, 6),
    ...pickN(base, 3),
  ]).slice(0, 12);

  return { hooks, beats, voiceover, cta, caption, hashtags };
}

function buildBeats(
  duration: 30 | 45 | 60,
  d: {
    product: string;
    pain: string;
    benefitLine: string;
    proof: string;
    keyword: string;
    price: string;
    hook: string;
    cta: string;
    tone: string;
  }
): ScriptBeat[] {
  const priceLine = d.price ? ` Mà giá chỉ ${d.price}, quá hời!` : "";
  const beats: ScriptBeat[] = [];

  // 0-3s Hook
  beats.push({
    time: "0–3s",
    label: "Hook",
    visual: "Cận mặt / cầm sản phẩm, biểu cảm bất ngờ. Chữ hook to giữa màn hình.",
    voiceover: d.hook,
  });

  // Vấn đề
  beats.push({
    time: duration === 30 ? "3–8s" : "3–10s",
    label: "Chạm nỗi đau",
    visual: "Cảnh minh hoạ vấn đề: nhăn mặt, thao tác khó khăn, tình huống bực bội.",
    voiceover: `Chắc bạn cũng từng ${d.pain} đúng không? Cảm giác đó thật sự khó chịu.`,
  });

  // Giải pháp
  beats.push({
    time: duration === 30 ? "8–16s" : "10–22s",
    label: "Giới thiệu giải pháp",
    visual: `Khoe ${d.product} ở nhiều góc, quay chậm điểm nổi bật.`,
    voiceover: `Và rồi mình tìm ra ${d.product}. Nó giúp ${d.benefitLine}.${priceLine}`,
  });

  // Với video dài hơn: thêm phần demo + bằng chứng
  if (duration >= 45) {
    beats.push({
      time: "22–32s",
      label: "Demo thực tế",
      visual: "Quay cận cảnh đang dùng sản phẩm, cho thấy trước - sau.",
      voiceover: `Bạn nhìn nè, mình dùng thử ngay tại đây. Hiệu quả thấy rõ luôn, ${d.keyword} khỏi bàn.`,
    });
  }

  beats.push({
    time: duration === 30 ? "16–24s" : duration === 45 ? "32–40s" : "22–34s",
    label: "Tạo niềm tin",
    visual: "Chèn review, ảnh chụp phản hồi khách, hoặc cận cảnh chi tiết chất lượng.",
    voiceover: `Không phải mình tự khen đâu, ${d.proof}.`,
  });

  if (duration >= 60) {
    beats.push({
      time: "34–48s",
      label: "Xử lý băn khoăn",
      visual: "Text hiện các câu hỏi thường gặp + trả lời nhanh gọn.",
      voiceover: `Nhiều bạn hỏi mình có đáng mua không, có bền không — câu trả lời là hoàn toàn xứng đáng, đổi trả rõ ràng nên yên tâm nha.`,
    });
  }

  // CTA
  beats.push({
    time: duration === 30 ? "24–30s" : duration === 45 ? "40–45s" : "48–60s",
    label: "Kêu gọi hành động (CTA)",
    visual: "Chỉ tay vào giỏ hàng, hiệu ứng mũi tên, chữ CTA nhấp nháy.",
    voiceover: d.cta,
  });

  return beats;
}

function capitalize(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function slugTag(s: string): string {
  const cleaned = s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
  return cleaned.length >= 3 && cleaned.length <= 24 ? cleaned : "";
}
