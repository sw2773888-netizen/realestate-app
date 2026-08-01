# AI Prompt Studio

Công cụ dành cho **người sáng tạo nội dung AI** — tạo nguyên liệu đầu vào (prompt) cho các model AI chỉ từ một vài ý tưởng đơn giản. Xây dựng bằng **Next.js 14 (App Router)**, **TypeScript** và **Tailwind CSS**. Toàn bộ chạy phía client, không cần API key.

## Ý tưởng

Bạn chỉ cần nhập:

- Muốn làm **video** gì.
- Muốn tạo **ảnh** gì.
- Muốn **nhân vật** như thế nào.

App sẽ tự tạo:

- 🖼️ **Prompt tạo ảnh** (DALL·E, Stable Diffusion, Leonardo, Ideogram…)
- 🎨 **Prompt Midjourney** (kèm sẵn `--ar`, `--v 6.1`, `--style raw`, `--no`)
- ⚡ **Prompt Flux** (viết theo câu văn tự nhiên)
- 🎬 **Prompt Veo** & 📽️ **Prompt Kling** (mô tả điện ảnh + chuyển động máy)
- 💬 **Prompt ChatGPT** (meta-prompt để mở rộng kịch bản / nhân vật / prompt)

## Tính năng

- 3 chế độ: **Ảnh · Video · Nhân vật** — quyết định loại prompt được tạo ra.
- **Mẫu nhanh** (preset) để bắt đầu tức thì: review món ăn, nhân vật thương hiệu, ảnh điện ảnh, ảnh sản phẩm…
- Dropdown chọn **phong cách, tông cảm xúc, ánh sáng, góc máy, chuyển động máy, tỉ lệ khung, thời lượng** — nhãn tiếng Việt, xuất ra từ khoá tiếng Anh tối ưu cho model.
- Tag **tăng chất lượng** và **negative prompt** mặc định cho ảnh.
- Prompt **cập nhật trực tiếp (live)** khi bạn chỉnh input.
- Nút **sao chép** cho từng prompt.
- Chọn **ngôn ngữ prompt ChatGPT**: English / Tiếng Việt.
- Giao diện **tối, responsive** cho desktop và mobile.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

Build production:

```bash
npm run build
npm start
```

## Cấu trúc

```
app/
  page.tsx              # Trang chính, render StudioApp
  layout.tsx            # Layout tối
components/studio/
  StudioApp.tsx         # Form nhập + hiển thị prompt (client)
  PromptCard.tsx        # Thẻ hiển thị một prompt + nút copy
  CopyButton.tsx        # Nút sao chép
lib/prompt/
  types.ts              # Kiểu dữ liệu
  options.ts            # Danh sách lựa chọn (VN ↔ EN) + preset
  engine.ts             # Bộ sinh prompt cho từng nền tảng
```

> Prompt được tạo bằng template thông minh phía client. Phần mô tả bạn nhập được giữ nguyên và ghép với các từ khoá tiếng Anh tối ưu cho từng model — không cần gọi API bên ngoài.
