# AI Script Studio — Viết kịch bản bán hàng TikTok

Công cụ giúp người làm nội dung TikTok và bán hàng **tự động viết kịch bản** cho video sau khi đã có ảnh/video AI. Chỉ cần nhập tên sản phẩm và chọn ngành, app sẽ tạo trọn bộ nội dung theo phong cách và thời lượng bạn chọn.

Xây dựng bằng **Next.js 14 (App Router)**, **TypeScript** và **Tailwind CSS**. Giao diện tiếng Việt.

## App tạo gì cho bạn?

- ✨ **Hook 3 giây đầu** — 3 phương án mở video để bạn chọn.
- 🎞️ **Kịch bản 30 / 45 / 60 giây** — chia theo timeline, kèm gợi ý **hình ảnh** và **lời thoại** từng phần.
- 🗣️ **Lời thoại liền mạch** — để thu âm / lồng tiếng.
- 📣 **CTA** — câu kêu gọi chốt đơn.
- 📝 **Caption** đăng bài.
- 🏷️ **Hashtag** gợi ý theo ngành.

Mỗi phần có nút **Copy** riêng, và nút **Copy tất cả** để dán ra file. Bấm **"Tạo phiên bản khác"** để nhận biến thể mới.

## Viết theo từng ngành

🔗 Affiliate · 💄 Mỹ phẩm · 🏠 Gia dụng · 🌿 Thảo dược · 👗 Thời trang · 🍼 Mẹ và bé

Mỗi ngành có bộ từ ngữ, nỗi đau khách hàng, lợi ích, bằng chứng, CTA và hashtag riêng nên nội dung ra đúng "chất" của ngành.

## Phong cách (tone)

⚡ Năng động · 🤗 Gần gũi · 🫶 Review chân thực · 🎓 Chuyên gia · ✨ Sang xịn · 📖 Kể chuyện

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
  page.tsx                  # Toàn bộ giao diện Studio (form + kết quả)
  layout.tsx, globals.css   # Layout & theme
components/studio/
  ResultView.tsx            # Hiển thị kết quả (hook, kịch bản, CTA, caption, hashtag)
  CopyButton.tsx            # Nút copy có fallback
lib/studio/
  types.ts                  # Kiểu dữ liệu
  industries.ts             # Dữ liệu 6 ngành + 6 phong cách
  generator.ts              # Bộ máy sinh nội dung (có seed để tạo lại biến thể)
```

## Đặc điểm kỹ thuật

- **Chạy 100% phía trình duyệt, không cần API key, không tốn phí** — học viên trải nghiệm được ngay, mở là dùng.
- Bộ sinh nội dung dùng seed nên "Tạo phiên bản khác" cho ra biến thể ổn định, không lặp nhàm.
- Responsive cho cả desktop và mobile.

> Nội dung do app tạo là bản nháp gợi ý — nên đọc lại và chỉnh cho khớp sản phẩm thật trước khi đăng.
