# Zola — Ứng dụng bất động sản (Zillow clone)

Ứng dụng bất động sản kiểu Zillow, xây dựng bằng **Next.js 14 (App Router)**, **TypeScript** và **Tailwind CSS**. Giao diện tiếng Việt với dữ liệu bất động sản mẫu tại Việt Nam.

## Tính năng

- 🏠 **Trang chủ** với thanh tìm kiếm nổi bật, danh mục nhanh và bất động sản nổi bật.
- 🔍 **Tìm kiếm & lọc**: theo từ khóa, loại giao dịch (bán/thuê), loại nhà, mức giá, số phòng ngủ; sắp xếp theo giá và độ mới.
- 📄 **Trang chi tiết**: thư viện ảnh, thông số nhà, mô tả, tiện ích, bản đồ (OpenStreetMap), thông tin môi giới.
- ❤️ **Lưu nhà yêu thích** (lưu trong `localStorage`, có badge đếm trên header).
- 💰 **Máy tính khoản vay** trả góp hàng tháng theo giá nhà, trả trước, lãi suất, thời hạn.
- 🧑‍💼 **Trang môi giới** và các trang giới thiệu (Bán nhà, Vay mua nhà).
- 📱 Giao diện **responsive** cho cả desktop và mobile.
- 🤖 **Bộ 500 Prompt AI kiếm tiền** (`/prompts`): trang bán + thư viện tra cứu (lọc theo 7 nhóm, tìm kiếm, copy nhanh). Bản tài liệu đầy đủ ở `docs/500-prompts-ai-kiem-tien.md`.

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
app/                # Các route (App Router)
  page.tsx          # Trang chủ
  homes/            # Danh sách + chi tiết bất động sản
  favorites/        # Nhà đã lưu
  sell / loans / agents
components/          # Header, PropertyCard, SearchBar, Gallery, MortgageCalculator...
lib/                # Dữ liệu mẫu, types, hàm format
```

> ⚠️ Dữ liệu bất động sản và hình ảnh mang tính minh họa (ảnh từ Unsplash), không phải sản phẩm thương mại thật.
