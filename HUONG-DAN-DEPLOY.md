# Hướng dẫn đưa website lên mạng (Deploy lên Vercel)

Làm theo các bước dưới đây để có một đường link website thật (dạng `ten-cua-ban.vercel.app`) — hoàn toàn **miễn phí**.

## Bước 1 — Tạo tài khoản Vercel
1. Vào **https://vercel.com**.
2. Bấm **Sign Up** → chọn **Continue with GitHub** và đăng nhập bằng tài khoản GitHub của bạn.

## Bước 2 — Nhập dự án
1. Sau khi đăng nhập, bấm **Add New… → Project**.
2. Vercel sẽ hiện danh sách repository GitHub của bạn. Chọn **`realestate-app`** → bấm **Import**.
   - Nếu chưa thấy, bấm **Adjust GitHub App Permissions** và cấp quyền cho repo này.

## Bước 3 — Chọn nhánh và Deploy
1. Ở mục **Branch**, chọn nhánh `claude/thanh-huong-course-app-6csp7d`
   (đây là nhánh chứa website khóa học). Hoặc merge nhánh này vào `main` rồi deploy `main`.
2. Vercel tự nhận diện đây là dự án **Next.js** — bạn **không cần chỉnh gì thêm**.
3. Bấm **Deploy** và đợi khoảng 1–2 phút.
4. Xong! Vercel sẽ cho bạn một đường link web thật để chia sẻ.

## Bước 4 (tùy chọn) — Bật nhận đăng ký qua email
Nếu muốn mỗi lượt đăng ký được **tự động gửi về email** của bạn:
1. Vào **https://web3forms.com**, nhập email của bạn → nhận **Access Key** miễn phí.
2. Trên Vercel: vào dự án → **Settings → Environment Variables**.
3. Thêm biến:
   - **Name:** `NEXT_PUBLIC_WEB3FORMS_KEY`
   - **Value:** dán access key vừa lấy
4. Vào tab **Deployments → Redeploy** để áp dụng.

> Nếu không làm bước 4, form đăng ký vẫn hoạt động: sau khi gửi, học viên thấy
> nút **"Nhắn Zalo 0942372806"** để liên hệ trực tiếp với bạn.

## Đổi tên miền (tùy chọn)
Muốn dùng tên miền riêng (vd `thanhhuong.com`)? Vào **Settings → Domains** trên
Vercel và làm theo hướng dẫn.
