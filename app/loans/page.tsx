import InfoPage from "@/components/InfoPage";

export default function LoansPage() {
  return (
    <InfoPage
      title="Vay mua nhà dễ dàng"
      subtitle="So sánh lãi suất từ nhiều ngân hàng và tính toán khoản vay phù hợp với khả năng tài chính."
      bullets={[
        "Ước tính số tiền bạn có thể vay dựa trên thu nhập.",
        "So sánh lãi suất và thời hạn từ các ngân hàng hàng đầu.",
        "Máy tính trả góp có sẵn trong từng tin đăng bán.",
        "Tư vấn hồ sơ vay miễn phí từ chuyên gia tài chính.",
      ]}
      cta={{ label: "Xem nhà đang bán", href: "/homes?type=sale" }}
    />
  );
}
