import Link from "next/link";
import { ArrowRight, CheckCircle2, Heart, Target, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/data";

export const metadata = {
  title: "Về Thanh Hương — Thanh Hương Academy",
  description:
    "Câu chuyện và sứ mệnh của Thanh Hương: giúp người Việt làm chủ AI và TikTok để tạo thu nhập.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-cyan" /> Người sáng lập
            </span>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              Thanh Hương
            </h1>
            <p className="mt-4 text-lg text-white/70">
              Nhà sáng tạo nội dung, người kinh doanh online và giảng viên — đồng
              hành cùng hàng nghìn học viên trên hành trình làm chủ AI &amp;
              TikTok.
            </p>
          </div>
          <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-3xl bg-brand-gradient sm:h-72 sm:w-72">
            <span className="text-7xl font-black text-white/90">TH</span>
          </div>
        </div>
      </section>

      {/* Câu chuyện */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          Câu chuyện của mình
        </h2>
        <div className="mt-5 space-y-4 leading-relaxed text-gray-600">
          <p>
            Mình bắt đầu như bao người khác — loay hoay với công việc, muốn tạo
            thêm thu nhập nhưng không biết bắt đầu từ đâu. Khi AI và TikTok bùng
            nổ, mình nhận ra đây là cơ hội để bất kỳ ai, kể cả người không rành
            công nghệ, cũng có thể xây dựng sự nghiệp của riêng mình.
          </p>
          <p>
            Sau nhiều năm thử nghiệm, thất bại và rồi thành công với những video
            triệu view và các chiến dịch bán hàng thực tế, mình đúc kết thành
            phương pháp đơn giản, dễ áp dụng. Mình tin rằng học phải đi đôi với
            làm — và ai cũng xứng đáng có cơ hội bứt phá.
          </p>
          <p>
            Đó là lý do <strong className="text-ink">{BRAND.name}</strong> ra
            đời: nơi bạn được cầm tay chỉ việc, học nhanh, làm được và tạo ra kết
            quả thật.
          </p>
        </div>
      </section>

      {/* Giá trị */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">
            Giá trị mình theo đuổi
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Value
              icon={<Target className="h-7 w-7" />}
              title="Thực chiến"
              desc="Chỉ dạy những gì mình đã làm và ra kết quả. Không lý thuyết suông."
            />
            <Value
              icon={<Heart className="h-7 w-7" />}
              title="Tận tâm"
              desc="Đồng hành cùng học viên đến khi làm được, không bỏ ai lại phía sau."
            />
            <Value
              icon={<Sparkles className="h-7 w-7" />}
              title="Cập nhật"
              desc="AI và TikTok thay đổi từng ngày, nội dung luôn được làm mới."
            />
          </div>
        </div>
      </section>

      {/* Con số */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 rounded-3xl bg-brand-gradient p-10 text-center text-white sm:grid-cols-3">
          <div>
            <p className="text-4xl font-black">13.000+</p>
            <p className="mt-1 text-white/80">Học viên</p>
          </div>
          <div>
            <p className="text-4xl font-black">4.9/5</p>
            <p className="mt-1 text-white/80">Đánh giá trung bình</p>
          </div>
          <div>
            <p className="text-4xl font-black">4</p>
            <p className="mt-1 text-white/80">Khóa học chuyên sâu</p>
          </div>
        </div>
      </section>

      {/* Cam kết */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          Mình cam kết với bạn
        </h2>
        <ul className="mt-5 space-y-3">
          {[
            "Nội dung dễ hiểu, phù hợp cả người mới bắt đầu.",
            "Hỗ trợ giải đáp trong suốt quá trình học.",
            "Hoàn tiền 100% trong 7 ngày nếu bạn không hài lòng.",
            "Cập nhật bài giảng miễn phí trọn đời.",
          ].map((t) => (
            <li key={t} className="flex items-center gap-3 text-gray-700">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" /> {t}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
            Cùng mình bắt đầu nhé?
          </h2>
          <p className="mt-3 text-gray-500">
            Chọn một khóa học và bắt đầu hành trình bứt phá của bạn ngay hôm nay.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-bold text-white"
            >
              Xem khóa học <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 px-7 py-3.5 font-bold text-ink transition hover:border-brand hover:text-brand"
            >
              Đăng ký tư vấn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Value({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-card">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{desc}</p>
    </div>
  );
}
