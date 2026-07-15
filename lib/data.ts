import { Course, Testimonial, Faq } from "./types";

export const BRAND = {
  name: "Thanh Hương Academy",
  instructor: "Thanh Hương",
  tagline: "Làm chủ AI & TikTok — Bứt phá thu nhập từ hôm nay",
  zalo: "0942372806",
  facebook: "https://www.facebook.com/share/1E9oHDsLkY/",
  tiktok: "https://www.tiktok.com/@thanhhuongpy99?is_from_webapp=1&sender_device=pc",
  tiktokHandle: "@thanhhuongpy99",
};

export const courses: Course[] = [
  {
    slug: "ai-cho-nguoi-moi",
    title: "AI Ứng Dụng Cho Người Mới",
    category: "ai",
    tagline: "Từ số 0 đến thành thạo ChatGPT, tạo ảnh & tự động hóa công việc",
    description:
      "Khóa học giúp bạn hiểu và ứng dụng AI vào công việc hằng ngày dù không rành công nghệ. Bạn sẽ biết cách ra lệnh (prompt) đúng cho ChatGPT, tạo hình ảnh, viết nội dung, dựng kịch bản và tiết kiệm hàng chục giờ làm việc mỗi tuần.",
    price: 999000,
    level: "Cơ bản",
    durationHours: 8,
    lessonsCount: 42,
    students: 3820,
    rating: 4.9,
    featured: true,
    highlights: [
      "Học qua ví dụ thực tế, làm được ngay sau mỗi buổi",
      "Bộ 200+ mẫu prompt tiếng Việt tặng kèm",
      "Không cần biết lập trình",
    ],
    outcomes: [
      "Sử dụng thành thạo ChatGPT để viết nội dung, email, kế hoạch",
      "Tạo hình ảnh & avatar bằng AI cho thương hiệu cá nhân",
      "Tự động hóa các việc lặp lại, tiết kiệm 10+ giờ mỗi tuần",
      "Xây dựng trợ lý AI riêng phục vụ công việc của bạn",
    ],
    audience: [
      "Người đi làm muốn tăng năng suất",
      "Chủ shop, người kinh doanh online",
      "Người mới hoàn toàn, chưa từng dùng AI",
    ],
    modules: [
      {
        title: "Chương 1 — Nhập môn AI",
        lessons: [
          { title: "AI là gì và vì sao bạn phải học ngay", duration: "10:24" },
          { title: "Làm quen ChatGPT, Gemini, Claude", duration: "14:02" },
          { title: "Cách tạo tài khoản & thiết lập cơ bản", duration: "08:15" },
        ],
      },
      {
        title: "Chương 2 — Nghệ thuật ra lệnh (Prompt)",
        lessons: [
          { title: "Công thức prompt hiệu quả cho người Việt", duration: "16:40" },
          { title: "10 mẫu prompt dùng hằng ngày", duration: "19:30" },
          { title: "Sửa & tối ưu câu trả lời của AI", duration: "12:10" },
        ],
      },
      {
        title: "Chương 3 — Tạo hình ảnh & nội dung",
        lessons: [
          { title: "Tạo ảnh sản phẩm bằng AI", duration: "15:22" },
          { title: "Viết bài bán hàng chuẩn cảm xúc", duration: "18:05" },
          { title: "Dựng kịch bản video ngắn", duration: "13:48" },
        ],
      },
      {
        title: "Chương 4 — Tự động hóa công việc",
        lessons: [
          { title: "Trợ lý AI trả lời khách tự động", duration: "17:33" },
          { title: "Kết nối AI với công cụ bạn đang dùng", duration: "20:12" },
        ],
      },
    ],
  },
  {
    slug: "tiktok-tu-0-den-viral",
    title: "TikTok Từ 0 Đến Viral",
    category: "tiktok",
    tagline: "Xây kênh, lên xu hướng và biến người xem thành người mua",
    description:
      "Lộ trình bài bản để xây một kênh TikTok từ con số 0: chọn ngách, quay dựng bằng điện thoại, bắt trend, hiểu thuật toán và tạo ra video triệu view. Phù hợp cho người muốn xây thương hiệu cá nhân hoặc bán hàng.",
    price: 499000,
    level: "Cơ bản",
    durationHours: 10,
    lessonsCount: 55,
    students: 5210,
    rating: 4.9,
    featured: true,
    highlights: [
      "Chỉ cần một chiếc điện thoại để bắt đầu",
      "Bộ 50 kịch bản video viral tặng kèm",
      "Phân tích thuật toán TikTok mới nhất 2025",
    ],
    outcomes: [
      "Chọn đúng ngách và định vị kênh TikTok của bạn",
      "Quay và dựng video cuốn hút chỉ bằng điện thoại",
      "Hiểu thuật toán để video được đề xuất nhiều hơn",
      "Tăng follow đều đặn và tạo video triệu view",
    ],
    audience: [
      "Người muốn xây thương hiệu cá nhân",
      "Chủ shop muốn bán hàng qua TikTok",
      "Bạn trẻ muốn trở thành nhà sáng tạo nội dung",
    ],
    modules: [
      {
        title: "Chương 1 — Nền tảng TikTok",
        lessons: [
          { title: "Tư duy làm nội dung trên TikTok", duration: "12:15" },
          { title: "Chọn ngách & định vị kênh", duration: "15:40" },
          { title: "Tối ưu hồ sơ để hút follow", duration: "09:30" },
        ],
      },
      {
        title: "Chương 2 — Quay & dựng video",
        lessons: [
          { title: "Quay đẹp chỉ bằng điện thoại", duration: "18:22" },
          { title: "Dựng video mượt bằng CapCut", duration: "22:10" },
          { title: "Bắt trend nhạc & hiệu ứng", duration: "14:05" },
        ],
      },
      {
        title: "Chương 3 — Thuật toán & lên xu hướng",
        lessons: [
          { title: "Cách TikTok đề xuất video", duration: "16:48" },
          { title: "3 giây đầu giữ chân người xem", duration: "13:20" },
          { title: "Phân tích chỉ số để tối ưu", duration: "17:55" },
        ],
      },
      {
        title: "Chương 4 — Biến view thành tiền",
        lessons: [
          { title: "Kêu gọi hành động đúng cách", duration: "11:38" },
          { title: "Điều hướng khách sang mua hàng", duration: "15:12" },
        ],
      },
    ],
  },
  {
    slug: "ai-tiktok-combo",
    title: "Combo AI + TikTok Toàn Diện",
    category: "combo",
    tagline: "Dùng AI sản xuất nội dung TikTok hàng loạt, bán hàng tự động",
    description:
      "Học trọn bộ cả 2 khóa AI và TikTok kèm hệ thống kết hợp: dùng AI lên ý tưởng, viết kịch bản, tạo hình ảnh và sản xuất video TikTok nhanh gấp 10 lần. Tiết kiệm hơn so với mua lẻ từng khóa.",
    price: 1290000,
    oldPrice: 1498000,
    level: "Toàn diện",
    durationHours: 18,
    lessonsCount: 96,
    students: 1980,
    rating: 5.0,
    featured: true,
    highlights: [
      "Trọn bộ 2 khóa AI & TikTok + hệ thống kết hợp",
      "Quy trình sản xuất 30 video/tháng bằng AI",
      "Cộng đồng riêng & hỗ trợ 1-1 từ Thanh Hương",
    ],
    outcomes: [
      "Dùng AI sản xuất video TikTok nhanh gấp 10 lần",
      "Xây hệ thống nội dung tự động, đăng đều mỗi ngày",
      "Kết hợp AI + TikTok để bán hàng không cần đội nhóm lớn",
      "Vận hành mô hình kinh doanh một người hiệu quả",
    ],
    audience: [
      "Người kinh doanh muốn tự động hóa nội dung",
      "Nhà sáng tạo muốn tăng sản lượng video",
      "Người muốn xây mô hình kinh doanh một người",
    ],
    modules: [
      {
        title: "Phần A — Nền tảng AI",
        lessons: [
          { title: "Toàn bộ khóa AI Ứng Dụng Cho Người Mới", duration: "8 giờ" },
        ],
      },
      {
        title: "Phần B — Nền tảng TikTok",
        lessons: [
          { title: "Toàn bộ khóa TikTok Từ 0 Đến Viral", duration: "10 giờ" },
        ],
      },
      {
        title: "Phần C — Hệ thống kết hợp AI × TikTok",
        lessons: [
          { title: "Dùng AI lên ý tưởng & kịch bản hàng loạt", duration: "20:15" },
          { title: "Tạo hình ảnh, avatar & giọng đọc AI", duration: "18:40" },
          { title: "Quy trình sản xuất 30 video/tháng", duration: "24:30" },
          { title: "Tự động hóa đăng bài & chăm khách", duration: "19:55" },
          { title: "Vận hành mô hình một người", duration: "22:18" },
        ],
      },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Ngọc Anh",
    role: "Chủ shop mỹ phẩm",
    quote:
      "Sau khóa TikTok của chị Hương, kênh mình lên hơn 20k follow trong 2 tháng, đơn hàng tăng gấp 3. Nội dung dễ hiểu, làm theo là ra kết quả.",
    avatar: "NA",
    course: "TikTok Từ 0 Đến Viral",
  },
  {
    name: "Minh Tuấn",
    role: "Nhân viên văn phòng",
    quote:
      "Mình vốn mù công nghệ mà giờ dùng AI viết báo cáo, làm slide nhanh gấp mấy lần. Tiết kiệm cả chục giờ mỗi tuần, quá đáng học.",
    avatar: "MT",
    course: "AI Ứng Dụng Cho Người Mới",
  },
  {
    name: "Thu Hà",
    role: "Mẹ bỉm kinh doanh online",
    quote:
      "Combo AI + TikTok giúp mình một mình làm hết từ quay, dựng tới bán hàng. Giờ mỗi ngày đăng đều 1 video mà không thấy đuối.",
    avatar: "TH",
    course: "Combo AI + TikTok Toàn Diện",
  },
  {
    name: "Hoàng Long",
    role: "Sinh viên",
    quote:
      "Học xong khóa TikTok mình xây kênh riêng, giờ đã có nhiều video vài trăm nghìn view. Chị Hương hỗ trợ nhiệt tình, hỏi gì cũng được trả lời.",
    avatar: "HL",
    course: "TikTok Từ 0 Đến Viral",
  },
];

export const faqs: Faq[] = [
  {
    q: "Mình không rành công nghệ có học được không?",
    a: "Hoàn toàn được. Các khóa học được thiết kế cho người mới bắt đầu, giảng từng bước bằng ví dụ thực tế. Bạn chỉ cần một chiếc điện thoại hoặc máy tính là có thể bắt đầu.",
  },
  {
    q: "Học xong có được hỗ trợ không?",
    a: "Có. Mỗi học viên được tham gia cộng đồng riêng để hỏi đáp, và các khóa combo còn được hỗ trợ 1-1 trực tiếp từ Thanh Hương.",
  },
  {
    q: "Khóa học có thời hạn không?",
    a: "Bạn được truy cập trọn đời vào bài giảng và tất cả các bản cập nhật sau này, học lại bao nhiêu lần tùy thích.",
  },
  {
    q: "Mình thanh toán bằng cách nào?",
    a: "Bạn có thể chuyển khoản ngân hàng hoặc qua ví Momo/ZaloPay. Sau khi đăng ký, đội ngũ sẽ liên hệ và kích hoạt khóa học trong vòng 24 giờ.",
  },
  {
    q: "Nếu không hài lòng thì sao?",
    a: "Cam kết hoàn tiền 100% trong 7 ngày đầu nếu bạn cảm thấy khóa học không phù hợp — không cần lý do.",
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export const categoryLabels: Record<string, string> = {
  ai: "Khóa học AI",
  tiktok: "Khóa học TikTok",
  combo: "Combo đặc biệt",
};
