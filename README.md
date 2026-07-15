# Thanh Hương Academy — Website bán khóa học AI & TikTok

Website bán khóa học online của **Thanh Hương**, chuyên về **AI ứng dụng** và **TikTok bán hàng**. Xây dựng bằng **Next.js 14 (App Router)**, **TypeScript** và **Tailwind CSS**. Giao diện tiếng Việt, thiết kế hiện đại với tông màu TikTok (hồng · tím · cyan).

## Tính năng

- 🎯 **Trang chủ (landing page)**: hero cuốn hút, lý do chọn học, khóa học nổi bật, lộ trình 4 bước, giới thiệu giảng viên, cảm nhận học viên, FAQ và CTA.
- 📚 **Danh sách khóa học** với bộ lọc theo danh mục (AI / TikTok / Combo).
- 📄 **Trang chi tiết khóa học**: giới thiệu, kết quả đạt được, nội dung theo chương/bài, đối tượng phù hợp và thẻ đăng ký (giá, ưu đãi, quyền lợi) dạng sticky.
- 📝 **Trang đăng ký**: form đăng ký/tư vấn có xác nhận gửi thành công (demo phía client).
- 👩‍🏫 **Trang giới thiệu Thanh Hương**: câu chuyện, giá trị, con số và cam kết.
- 📱 Giao diện **responsive** cho desktop và mobile.

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
app/                    # Các route (App Router)
  page.tsx              # Trang chủ / landing page
  courses/              # Danh sách + chi tiết khóa học
    [slug]/page.tsx     # Chi tiết một khóa học
  register/page.tsx     # Đăng ký / tư vấn
  about/page.tsx        # Về Thanh Hương
components/             # Header, Footer, CourseCard, Faq, RegisterForm
lib/                    # Dữ liệu khóa học, types, hàm format giá
```

## Tùy chỉnh

- Sửa thông tin thương hiệu (tên, email, Zalo, mạng xã hội) tại `lib/data.ts` → `BRAND`.
- Thêm / sửa khóa học tại `lib/data.ts` → mảng `courses`.
- Đổi màu thương hiệu tại `tailwind.config.ts`.

> ⚠️ Nội dung khóa học, giá và cảm nhận học viên hiện là dữ liệu minh họa. Form đăng ký ở bản demo chỉ lưu tạm phía client — khi triển khai thật, hãy kết nối tới email/CRM hoặc một API lưu đơn đăng ký.
