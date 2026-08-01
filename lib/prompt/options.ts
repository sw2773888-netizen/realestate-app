import type { Option, Preset, StudioInput } from "./types";

export const MODES: { value: StudioInput["mode"]; label: string; emoji: string; hint: string }[] = [
  { value: "image", label: "Ảnh", emoji: "🖼️", hint: "Tạo ảnh tĩnh (Flux, Midjourney, DALL·E…)" },
  { value: "video", label: "Video", emoji: "🎬", hint: "Tạo video (Veo, Kling, Runway…)" },
  { value: "character", label: "Nhân vật", emoji: "🧑‍🎨", hint: "Thiết kế nhân vật nhất quán" },
];

export const STYLES: Option[] = [
  { value: "hyper-realistic photography, shot on a full-frame DSLR", label: "Ảnh thực (Photorealistic)" },
  { value: "cinematic film still, anamorphic, movie grade", label: "Điện ảnh (Cinematic)" },
  { value: "Japanese anime style, cel shading, vibrant", label: "Anime / Manga" },
  { value: "Pixar-style 3D render, soft shading", label: "Hoạt hình 3D (Pixar)" },
  { value: "cyberpunk, neon-lit, futuristic", label: "Cyberpunk" },
  { value: "digital painting, concept art, ArtStation trending", label: "Concept art" },
  { value: "watercolor illustration, soft edges", label: "Màu nước (Watercolor)" },
  { value: "oil painting, classical, textured brush strokes", label: "Sơn dầu (Oil painting)" },
  { value: "flat vector illustration, minimal", label: "Vector phẳng (Flat)" },
  { value: "product photography, studio lighting, clean background", label: "Ảnh sản phẩm" },
  { value: "vintage film photography, 35mm, grainy", label: "Phim cổ điển (Vintage)" },
  { value: "fantasy art, epic, highly detailed", label: "Kỳ ảo (Fantasy)" },
];

export const MOODS: Option[] = [
  { value: "warm and cheerful atmosphere", label: "Ấm áp, vui tươi" },
  { value: "moody, dramatic and cinematic atmosphere", label: "Kịch tính, u tối" },
  { value: "calm, peaceful and serene mood", label: "Yên bình, thư thái" },
  { value: "mysterious and dreamy atmosphere", label: "Huyền bí, mộng mơ" },
  { value: "energetic and dynamic mood", label: "Sôi động, năng lượng" },
  { value: "romantic and soft mood", label: "Lãng mạn, dịu dàng" },
  { value: "epic and grand atmosphere", label: "Hùng vĩ, hoành tráng" },
  { value: "nostalgic and melancholic mood", label: "Hoài niệm, man mác" },
];

export const LIGHTINGS: Option[] = [
  { value: "soft natural lighting", label: "Ánh sáng tự nhiên" },
  { value: "golden hour sunlight, warm glow", label: "Giờ vàng (Golden hour)" },
  { value: "dramatic rim lighting, high contrast", label: "Ngược sáng kịch tính" },
  { value: "soft studio softbox lighting", label: "Ánh sáng studio" },
  { value: "neon and colorful ambient lighting", label: "Đèn neon nhiều màu" },
  { value: "moody low-key lighting", label: "Tối, low-key" },
  { value: "bright and airy high-key lighting", label: "Sáng, high-key" },
  { value: "blue hour twilight lighting", label: "Hoàng hôn xanh" },
];

export const CAMERAS: Option[] = [
  { value: "extreme close-up shot", label: "Cận đặc tả (Extreme close-up)" },
  { value: "close-up portrait shot", label: "Cận cảnh (Close-up)" },
  { value: "medium shot", label: "Trung cảnh (Medium)" },
  { value: "full body shot", label: "Toàn thân (Full body)" },
  { value: "wide establishing shot", label: "Toàn cảnh (Wide)" },
  { value: "low angle shot", label: "Góc thấp (Low angle)" },
  { value: "high angle / bird's eye view", label: "Góc cao (High angle)" },
  { value: "over-the-shoulder shot", label: "Qua vai (OTS)" },
  { value: "aerial drone shot", label: "Flycam (Aerial)" },
];

export const CAMERA_MOVES: Option[] = [
  { value: "static locked-off shot", label: "Máy tĩnh" },
  { value: "slow dolly-in push", label: "Đẩy máy vào chậm (dolly-in)" },
  { value: "slow dolly-out pull", label: "Kéo máy ra (dolly-out)" },
  { value: "smooth tracking / following shot", label: "Bám theo (tracking)" },
  { value: "orbital 360 arc around subject", label: "Xoay quanh (orbit)" },
  { value: "handheld shaky documentary movement", label: "Cầm tay (handheld)" },
  { value: "crane / boom up reveal", label: "Cần cẩu nâng (crane)" },
  { value: "fast whip pan transition", label: "Lia nhanh (whip pan)" },
];

export const ASPECTS: Option[] = [
  { value: "16:9", label: "16:9 — Ngang (YouTube, TV)" },
  { value: "9:16", label: "9:16 — Dọc (TikTok, Reels, Shorts)" },
  { value: "1:1", label: "1:1 — Vuông (Instagram)" },
  { value: "4:5", label: "4:5 — Dọc nhẹ (Instagram feed)" },
  { value: "4:3", label: "4:3 — Cổ điển" },
  { value: "3:2", label: "3:2 — Ảnh chụp" },
  { value: "21:9", label: "21:9 — Siêu rộng (Cinematic)" },
];

export const DURATIONS: Option[] = [
  { value: "3 seconds", label: "3 giây" },
  { value: "5 seconds", label: "5 giây" },
  { value: "8 seconds", label: "8 giây" },
  { value: "10 seconds", label: "10 giây" },
];

export const QUALITY_TAGS: Option[] = [
  { value: "8K UHD, ultra detailed", label: "8K UHD, siêu chi tiết" },
  { value: "sharp focus, crisp", label: "Nét căng" },
  { value: "professional color grading", label: "Color grading pro" },
  { value: "highly detailed textures", label: "Chi tiết bề mặt cao" },
  { value: "photorealistic skin texture", label: "Da người chân thực" },
  { value: "depth of field, bokeh", label: "Xóa phông (bokeh)" },
  { value: "volumetric lighting", label: "Ánh sáng thể tích" },
  { value: "award-winning composition", label: "Bố cục ấn tượng" },
];

export const DEFAULT_NEGATIVE =
  "blurry, low quality, low resolution, distorted, deformed, disfigured, extra limbs, extra fingers, bad anatomy, bad proportions, watermark, signature, text, logo, jpeg artifacts, oversaturated, ugly, duplicate";

export const DEFAULT_INPUT: StudioInput = {
  mode: "image",
  idea: "",
  character: "",
  setting: "",
  action: "",
  style: STYLES[0].value,
  mood: MOODS[0].value,
  lighting: LIGHTINGS[0].value,
  camera: CAMERAS[1].value,
  cameraMove: CAMERA_MOVES[1].value,
  aspect: ASPECTS[0].value,
  duration: DURATIONS[1].value,
  quality: [QUALITY_TAGS[0].value, QUALITY_TAGS[1].value],
  lang: "en",
};

export const PRESETS: Preset[] = [
  {
    id: "food-review",
    name: "Video review món ăn",
    emoji: "🍜",
    input: {
      mode: "video",
      idea: "Video cận cảnh một tô phở bò nóng hổi bốc khói, sợi phở được gắp lên",
      character: "",
      setting: "quán ăn Việt Nam ấm cúng, bàn gỗ",
      action: "hơi nước bốc lên, đũa gắp sợi phở kéo dài",
      style: STYLES[9].value,
      mood: MOODS[0].value,
      lighting: LIGHTINGS[1].value,
      camera: CAMERAS[1].value,
      cameraMove: CAMERA_MOVES[1].value,
      aspect: "9:16",
      duration: "5 seconds",
    },
  },
  {
    id: "brand-character",
    name: "Nhân vật thương hiệu",
    emoji: "🦊",
    input: {
      mode: "character",
      idea: "Nhân vật linh vật (mascot) một chú cáo dễ thương cho thương hiệu công nghệ",
      character: "chú cáo cam, đeo kính, mặc áo hoodie xanh, thân thiện, mắt to",
      setting: "nền gradient tối giản",
      action: "",
      style: STYLES[3].value,
      mood: MOODS[0].value,
      lighting: LIGHTINGS[3].value,
      camera: CAMERAS[3].value,
      cameraMove: CAMERA_MOVES[0].value,
      aspect: "1:1",
    },
  },
  {
    id: "cinematic-city",
    name: "Ảnh điện ảnh thành phố",
    emoji: "🌃",
    input: {
      mode: "image",
      idea: "Một cô gái trẻ đứng giữa phố Tokyo về đêm dưới mưa, ánh đèn neon phản chiếu",
      character: "cô gái châu Á, áo khoác da đen, tóc ngắn, cầm ô trong suốt",
      setting: "phố Tokyo về đêm, mưa nhẹ, biển hiệu neon",
      action: "",
      style: STYLES[1].value,
      mood: MOODS[1].value,
      lighting: LIGHTINGS[4].value,
      camera: CAMERAS[2].value,
      cameraMove: CAMERA_MOVES[0].value,
      aspect: "21:9",
    },
  },
  {
    id: "product-shot",
    name: "Ảnh sản phẩm mỹ phẩm",
    emoji: "🧴",
    input: {
      mode: "image",
      idea: "Chai serum dưỡng da sang trọng đặt trên đá cẩm thạch, có giọt nước",
      character: "",
      setting: "nền đá cẩm thạch trắng, có lá xanh trang trí",
      action: "",
      style: STYLES[9].value,
      mood: MOODS[2].value,
      lighting: LIGHTINGS[3].value,
      camera: CAMERAS[0].value,
      cameraMove: CAMERA_MOVES[0].value,
      aspect: "4:5",
    },
  },
];
