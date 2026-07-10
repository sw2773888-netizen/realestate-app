import InfoPage from "@/components/InfoPage";

export default function SellPage() {
  return (
    <InfoPage
      title="Bán nhà cùng Zola"
      subtitle="Đăng tin miễn phí, tiếp cận hàng nghìn người mua tiềm năng và bán nhà với giá tốt nhất."
      bullets={[
        "Định giá nhà miễn phí dựa trên dữ liệu thị trường khu vực.",
        "Tạo tin đăng chuyên nghiệp với hình ảnh và thông tin đầy đủ.",
        "Kết nối trực tiếp với người mua và môi giới uy tín.",
        "Theo dõi lượt xem, lượt quan tâm theo thời gian thực.",
      ]}
      cta={{ label: "Đăng bán ngay", href: "/homes?type=sale" }}
    />
  );
}
