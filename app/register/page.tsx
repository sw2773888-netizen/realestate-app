import { ShieldCheck, Infinity as InfinityIcon, Users, Star } from "lucide-react";
import RegisterForm from "@/components/RegisterForm";
import { getCourse, BRAND } from "@/lib/data";

export const metadata = {
  title: "Đăng ký học — Thanh Hương Academy",
  description:
    "Đăng ký khóa học AI & TikTok cùng Thanh Hương. Để lại thông tin để được tư vấn lộ trình phù hợp.",
};

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { course?: string };
}) {
  const selected = searchParams.course
    ? getCourse(searchParams.course)
    : undefined;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        {/* Cột thông tin */}
        <div className="lg:pt-6">
          <span className="text-sm font-bold uppercase tracking-wide text-brand">
            Đăng ký học
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            Bắt đầu hành trình của bạn
          </h1>
          {selected ? (
            <p className="mt-4 text-gray-600">
              Bạn đang đăng ký khóa{" "}
              <strong className="text-ink">{selected.title}</strong>. Điền thông
              tin bên dưới, đội ngũ sẽ liên hệ hướng dẫn thanh toán và kích hoạt
              khóa học.
            </p>
          ) : (
            <p className="mt-4 text-gray-600">
              Để lại thông tin, Thanh Hương sẽ tư vấn lộ trình học phù hợp nhất
              với mục tiêu của bạn — hoàn toàn miễn phí.
            </p>
          )}

          <ul className="mt-8 space-y-4">
            <Benefit
              icon={<InfinityIcon className="h-5 w-5" />}
              title="Truy cập trọn đời"
              desc="Học lại bao nhiêu lần tùy thích, kèm mọi bản cập nhật."
            />
            <Benefit
              icon={<Users className="h-5 w-5" />}
              title="Cộng đồng & hỗ trợ"
              desc="Tham gia nhóm học viên riêng, hỏi đáp trực tiếp."
            />
            <Benefit
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Cam kết hoàn tiền"
              desc="Hoàn tiền 100% trong 7 ngày nếu không hài lòng."
            />
          </ul>

          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-600">
              “Học xong mình tự tin làm nội dung và bán hàng trên TikTok. Cảm ơn
              chị Hương rất nhiều!”
            </p>
            <p className="mt-2 text-xs font-bold text-ink">— Học viên khóa 2024</p>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Cần hỗ trợ nhanh? Nhắn Zalo{" "}
            <strong className="text-ink">{BRAND.zalo}</strong> hoặc nhắn tin
            TikTok{" "}
            <a
              href={BRAND.tiktok}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-brand hover:underline"
            >
              {BRAND.tiktokHandle}
            </a>
            .
          </p>
        </div>

        {/* Cột form */}
        <div>
          <RegisterForm defaultCourse={selected?.slug} />
        </div>
      </div>
    </div>
  );
}

function Benefit({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white">
        {icon}
      </span>
      <div>
        <p className="font-bold text-ink">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </li>
  );
}
