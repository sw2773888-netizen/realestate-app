import type { GeneratedPrompt, StudioInput } from "./types";
import { DEFAULT_NEGATIVE } from "./options";

/** Nối các phần không rỗng bằng dấu phẩy */
function join(parts: (string | undefined | null)[]): string {
  return parts
    .map((p) => (p ?? "").trim())
    .filter(Boolean)
    .join(", ");
}

/** Nối các câu, mỗi phần kết thúc bằng dấu chấm */
function sentences(parts: (string | undefined | null)[]): string {
  return parts
    .map((p) => (p ?? "").trim())
    .filter(Boolean)
    .map((p) => (/[.!?]$/.test(p) ? p : p + "."))
    .join(" ");
}

/** Khối mô tả cốt lõi dùng chung cho các model ảnh */
function coreVisual(input: StudioInput): string {
  return join([
    input.idea,
    input.character,
    input.setting ? `set in ${input.setting}` : "",
    input.style,
    input.mood,
    input.lighting,
    input.camera,
    input.quality.join(", "),
  ]);
}

/** Prompt ảnh tổng quát (DALL·E, SDXL, Leonardo, Ideogram…) */
function buildImage(input: StudioInput): GeneratedPrompt {
  return {
    key: "image",
    label: "Prompt tạo ảnh",
    icon: "🖼️",
    description: "Prompt mô tả chi tiết, dùng cho DALL·E, Stable Diffusion, Leonardo, Ideogram…",
    prompt: coreVisual(input),
    negative: DEFAULT_NEGATIVE,
    params: `Aspect ratio: ${input.aspect}`,
  };
}

/** Midjourney: mô tả + tham số --ar --v --style */
function buildMidjourney(input: StudioInput): GeneratedPrompt {
  const body = join([
    input.idea,
    input.character,
    input.setting ? `in ${input.setting}` : "",
    input.style,
    input.mood,
    input.lighting,
    input.camera,
    input.quality.join(", "),
  ]);
  const params = `--ar ${input.aspect} --style raw --v 6.1 --no ${input.mode === "character" ? "extra limbs, deformed hands" : "blurry, distorted, text, watermark"}`;
  return {
    key: "midjourney",
    label: "Prompt Midjourney",
    icon: "🎨",
    description: "Đã kèm tham số --ar, --v 6.1, --style raw và --no. Dán trực tiếp vào /imagine.",
    prompt: `${body} ${params}`,
    params,
  };
}

/** Flux: model thích câu văn tự nhiên, mạch lạc */
function buildFlux(input: StudioInput): GeneratedPrompt {
  const prompt = sentences([
    `A ${input.style} of ${input.idea || "the described scene"}`,
    input.character && `The main subject: ${input.character}`,
    input.setting && `The scene is set in ${input.setting}`,
    `${input.camera}, with ${input.lighting}`,
    `${input.mood}`,
    input.quality.length ? `Rendered with ${input.quality.join(", ")}` : "",
    `Aspect ratio ${input.aspect}`,
  ]);
  return {
    key: "flux",
    label: "Prompt Flux",
    icon: "⚡",
    description: "Viết theo câu văn tự nhiên — tối ưu cho Flux (Flux.1 dev/pro).",
    prompt,
    params: `Aspect ratio: ${input.aspect}`,
  };
}

/** Veo: mô tả điện ảnh, có chuyển động máy + âm thanh gợi ý */
function buildVeo(input: StudioInput): GeneratedPrompt {
  const prompt = sentences([
    `Cinematic ${input.duration} video shot`,
    `Subject: ${join([input.idea, input.character])}`,
    input.action && `Action: ${input.action}`,
    input.setting && `Location: ${input.setting}`,
    `Camera: ${input.cameraMove}, ${input.camera}`,
    `Lighting: ${input.lighting}`,
    `Style & mood: ${input.style}, ${input.mood}`,
    input.quality.length ? `${input.quality.join(", ")}` : "",
    `Smooth, natural and realistic motion, coherent physics`,
    `Ambient sound design matching the scene`,
    `Aspect ratio ${input.aspect}`,
  ]);
  return {
    key: "veo",
    label: "Prompt Veo",
    icon: "🎬",
    description: "Mô tả điện ảnh cho Google Veo — gồm chuyển động máy, ánh sáng và âm thanh.",
    prompt,
    params: `Duration: ${input.duration} · Aspect ratio: ${input.aspect}`,
  };
}

/** Kling: cấu trúc rõ theo trường, model AI của Kuaishou */
function buildKling(input: StudioInput): GeneratedPrompt {
  const lines = [
    `Scene: ${join([input.idea, input.setting && `at ${input.setting}`])}`,
    `Subject: ${input.character || input.idea}`,
    input.action && `Motion: ${input.action}`,
    `Camera movement: ${input.cameraMove}, ${input.camera}`,
    `Lighting: ${input.lighting}`,
    `Visual style: ${input.style}, ${input.mood}`,
    input.quality.length ? `Quality: ${input.quality.join(", ")}` : "",
    `Duration: ${input.duration}`,
  ].filter(Boolean);
  return {
    key: "kling",
    label: "Prompt Kling",
    icon: "📽️",
    description: "Cấu trúc theo trường rõ ràng cho Kling AI (Kuaishou).",
    prompt: lines.join("\n"),
    params: `Duration: ${input.duration} · Aspect ratio: ${input.aspect}`,
  };
}

/** ChatGPT: meta-prompt hướng dẫn ChatGPT hỗ trợ tạo nội dung theo mode */
function buildChatGPT(input: StudioInput): GeneratedPrompt {
  const vi = input.lang === "vi";
  const subject = join([input.idea, input.character, input.setting && `bối cảnh ${input.setting}`]);

  let prompt = "";
  if (input.mode === "video") {
    prompt = vi
      ? sentences([
          `Bạn là một biên kịch kiêm đạo diễn nội dung video ngắn chuyên nghiệp`,
          `Hãy giúp tôi xây dựng một video về: ${subject}`,
          input.action && `Diễn biến chính: ${input.action}`,
          `Yêu cầu đầu ra:
1. Một hook mở đầu 3 giây thu hút người xem.
2. Kịch bản phân cảnh (mỗi cảnh: hình ảnh, lời thoại/voice-over, thời lượng).
3. Gợi ý nhạc nền và hiệu ứng.
4. Caption và 5 hashtag phù hợp cho ${input.aspect === "9:16" ? "TikTok/Reels" : "YouTube"}`,
          `Phong cách: ${input.mood}. Thời lượng mục tiêu: ${input.duration}`,
        ])
      : sentences([
          `You are a professional short-form video scriptwriter and director`,
          `Help me build a video about: ${subject}`,
          input.action && `Main action: ${input.action}`,
          `Deliver: 1) a 3-second hook, 2) a shot-by-shot script (visual, voice-over, duration), 3) music & SFX suggestions, 4) a caption with 5 hashtags`,
          `Tone: ${input.mood}. Target length: ${input.duration}`,
        ]);
  } else if (input.mode === "character") {
    prompt = vi
      ? sentences([
          `Bạn là chuyên gia thiết kế nhân vật (character designer)`,
          `Hãy phát triển hồ sơ chi tiết cho nhân vật: ${subject}`,
          `Yêu cầu đầu ra:
1. Tên và tính cách nhân vật.
2. Mô tả ngoại hình chi tiết (khuôn mặt, trang phục, phụ kiện, màu sắc chủ đạo).
3. 3 biến thể tư thế/biểu cảm để tạo bộ nhân vật nhất quán.
4. Một prompt tiếng Anh hoàn chỉnh để tạo ảnh nhân vật này`,
          `Phong cách hình ảnh: ${input.style}`,
        ])
      : sentences([
          `You are an expert character designer`,
          `Develop a detailed profile for the character: ${subject}`,
          `Deliver: 1) name & personality, 2) detailed appearance (face, outfit, accessories, key colors), 3) three pose/expression variants for a consistent character sheet, 4) a complete English image prompt`,
          `Visual style: ${input.style}`,
        ]);
  } else {
    prompt = vi
      ? sentences([
          `Bạn là một prompt engineer chuyên tạo prompt sinh ảnh AI`,
          `Hãy viết cho tôi một prompt tiếng Anh thật chi tiết để tạo ảnh về: ${subject}`,
          `Yêu cầu: mô tả rõ chủ thể, bối cảnh, ánh sáng (${input.lighting}), phong cách (${input.style}), tông cảm xúc (${input.mood}) và các từ khoá tăng chất lượng`,
          `Sau đó đề xuất thêm 3 biến thể prompt khác nhau và 1 negative prompt`,
        ])
      : sentences([
          `You are a prompt engineer specialized in AI image generation`,
          `Write me a highly detailed English prompt to generate an image of: ${subject}`,
          `Describe the subject, setting, lighting (${input.lighting}), style (${input.style}), mood (${input.mood}) and quality keywords`,
          `Then propose 3 alternative prompt variations and 1 negative prompt`,
        ]);
  }

  return {
    key: "chatgpt",
    label: "Prompt ChatGPT",
    icon: "💬",
    description: "Meta-prompt để ChatGPT/Claude giúp bạn mở rộng kịch bản, nhân vật hoặc prompt.",
    prompt,
  };
}

/**
 * Sinh toàn bộ prompt theo mode.
 * - image: ảnh, midjourney, flux, chatgpt
 * - video: veo, kling, image (khung hình), chatgpt
 * - character: ảnh, midjourney, chatgpt
 */
export function generatePrompts(input: StudioInput): GeneratedPrompt[] {
  switch (input.mode) {
    case "video":
      return [buildVeo(input), buildKling(input), buildImage(input), buildChatGPT(input)];
    case "character":
      return [buildImage(input), buildMidjourney(input), buildFlux(input), buildChatGPT(input)];
    case "image":
    default:
      return [buildImage(input), buildMidjourney(input), buildFlux(input), buildChatGPT(input)];
  }
}

export function hasEnoughInput(input: StudioInput): boolean {
  return input.idea.trim().length > 0 || input.character.trim().length > 0;
}
