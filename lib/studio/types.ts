export type IndustryId =
  | "affiliate"
  | "cosmetics"
  | "home"
  | "herbal"
  | "fashion"
  | "mombaby";

export type ToneId =
  | "energetic"
  | "expert"
  | "friendly"
  | "honest"
  | "luxury"
  | "storytelling";

export interface Industry {
  id: IndustryId;
  name: string;
  emoji: string;
  tagline: string;
  /** Từ ngữ đặc trưng ngành để chèn vào kịch bản */
  keywords: string[];
  /** Nỗi đau / vấn đề khách hàng thường gặp */
  painPoints: string[];
  /** Lợi ích / lời hứa sản phẩm */
  benefits: string[];
  /** Bằng chứng / yếu tố tạo niềm tin */
  proofs: string[];
  /** Câu chốt CTA đặc trưng */
  ctas: string[];
  /** Hashtag gợi ý theo ngành */
  hashtags: string[];
}

export interface Tone {
  id: ToneId;
  name: string;
  emoji: string;
  desc: string;
}

export interface GenerateInput {
  industry: IndustryId;
  tone: ToneId;
  product: string;
  audience: string;
  benefit: string;
  price: string;
  duration: 30 | 45 | 60;
  /** seed để tạo biến thể khác nhau khi bấm "tạo lại" */
  seed: number;
}

export interface ScriptBeat {
  /** Mốc thời gian, ví dụ "0–3s" */
  time: string;
  /** Nhãn phần: Hook, Vấn đề, Giải pháp... */
  label: string;
  /** Gợi ý hình ảnh / hành động quay */
  visual: string;
  /** Lời thoại đọc trên video */
  voiceover: string;
}

export interface ScriptResult {
  hooks: string[];
  beats: ScriptBeat[];
  voiceover: string;
  cta: string;
  caption: string;
  hashtags: string[];
}
