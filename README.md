# 🎈 Bé Học Tiếng Anh — Chuẩn bị vào lớp 1

Ứng dụng web vui nhộn giúp các bé 5–6 tuổi làm quen với tiếng Anh trước khi vào lớp 1.
Giao diện nhiều màu sắc, nút bấm to, có **phát âm chuẩn tiếng Anh** và **trò chơi đố vui** để bé vừa học vừa chơi.

## ✨ Tính năng

- **🔤 Bảng chữ cái (A–Z)** — mỗi chữ kèm một từ ví dụ và hình minh hoạ.
- **🔢 Số đếm (1–10)**, **🎨 Màu sắc**, **🐘 Con vật**, **⭐ Hình khối**, **👨‍👩‍👧‍👦 Gia đình**, **🍎 Trái cây**.
- **🔊 Phát âm tiếng Anh** tự động (dùng Web Speech API của trình duyệt) — đọc chậm, rõ để bé nghe theo.
- **🎮 Trò chơi đố vui** — nghe từ và chọn đúng hình, có chấm điểm và pháo hoa khen thưởng.
- **⭐ Hệ thống sao thưởng** — bé nhận sao khi học xong chủ đề hoặc trả lời đúng (lưu lại trên máy).
- **📱 Chạy tốt trên điện thoại, máy tính bảng, máy tính** — vuốt trái/phải để lật thẻ, bấm phím mũi tên trên máy tính.
- Hoạt hình, âm thanh vui tai, hiệu ứng pháo hoa để tạo hứng thú.

## 🚀 Cách dùng

Không cần cài đặt gì cả. Chỉ cần mở file `index.html` bằng trình duyệt (Chrome, Safari, Edge…).

Hoặc chạy một máy chủ web đơn giản để phát âm hoạt động tốt nhất:

```bash
# Python 3
python3 -m http.server 8000
# rồi mở http://localhost:8000
```

> 💡 **Mẹo:** Phần phát âm dùng giọng đọc có sẵn của trình duyệt/hệ điều hành.
> Nếu không nghe thấy tiếng, hãy kiểm tra loa và chắc chắn nút **🔊 Âm thanh** đang bật.

## 📂 Cấu trúc dự án

| File | Vai trò |
|------|---------|
| `index.html` | Khung giao diện các màn hình |
| `styles.css` | Toàn bộ màu sắc, hoạt hình, bố cục thân thiện với trẻ |
| `data.js` | Nội dung học tập (chữ cái, số, màu, con vật…) — **dễ dàng thêm/sửa** |
| `app.js` | Xử lý điều hướng, phát âm, trò chơi, sao thưởng |

## ➕ Thêm nội dung mới

Mở `data.js` và thêm mục vào chủ đề mong muốn, ví dụ:

```js
{ emoji: "🚗", en: "Car", vi: "Cái xe hơi", say: "Car" }
```

Muốn thêm hẳn một chủ đề mới thì thêm một khối vào `TOPICS`, rồi thêm một nút
`menu-card` tương ứng trong `index.html` với thuộc tính `data-go="<tên_chủ_đề>"`.

## 🧒 Dành cho phụ huynh

- Ứng dụng chạy hoàn toàn trên máy, **không thu thập dữ liệu**, không quảng cáo.
- Nên ngồi học cùng bé, khuyến khích bé đọc theo sau khi nghe phát âm.
- Mỗi ngày học 5–10 phút là đủ để bé ghi nhớ lâu.

Chúc bé học vui và tự tin bước vào lớp 1! 🌟
