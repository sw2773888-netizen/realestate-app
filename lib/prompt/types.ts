export type Mode = "image" | "video" | "character";
export type OutputLang = "en" | "vi";

export interface StudioInput {
  /** Loại nội dung muốn tạo */
  mode: Mode;
  /** Ý tưởng chính: muốn làm video/ảnh gì */
  idea: string;
  /** Mô tả nhân vật / chủ thể */
  character: string;
  /** Bối cảnh, không gian */
  setting: string;
  /** Hành động / chuyển động (chủ yếu cho video) */
  action: string;
  /** Phong cách nghệ thuật (english value) */
  style: string;
  /** Tông cảm xúc / mood */
  mood: string;
  /** Ánh sáng */
  lighting: string;
  /** Góc / cỡ máy */
  camera: string;
  /** Chuyển động máy quay (video) */
  cameraMove: string;
  /** Tỉ lệ khung hình */
  aspect: string;
  /** Thời lượng video */
  duration: string;
  /** Các tag tăng chất lượng (english values) */
  quality: string[];
  /** Ngôn ngữ prompt đầu ra */
  lang: OutputLang;
}

export interface GeneratedPrompt {
  key: string;
  label: string;
  icon: string;
  /** Mô tả ngắn công cụ này dùng cho việc gì */
  description: string;
  /** Nội dung prompt chính */
  prompt: string;
  /** Negative prompt (nếu có) */
  negative?: string;
  /** Tham số kèm theo (vd: --ar 16:9) */
  params?: string;
}

/** Một lựa chọn trong dropdown: nhãn tiếng Việt, value tiếng Anh dùng cho prompt */
export interface Option {
  value: string;
  label: string;
}

export interface Preset {
  id: string;
  name: string;
  emoji: string;
  input: Partial<StudioInput>;
}
