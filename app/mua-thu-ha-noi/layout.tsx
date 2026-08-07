import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mùa Thu Hà Nội — Studio làm đẹp ảnh",
  description:
    "Tải ảnh chân dung của bạn lên, làm mịn & sáng da khuôn mặt gốc và khoác lên sắc thu Hà Nội: nắng vàng, lá rơi, tông ấm lãng mạn. Xử lý ngay trên trình duyệt, ảnh không rời máy bạn.",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
