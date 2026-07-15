export type Category = "ai" | "tiktok" | "combo";

export interface Lesson {
  title: string;
  duration: string; // ví dụ "12:30"
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  title: string;
  category: Category;
  tagline: string;
  description: string;
  price: number; // VND
  oldPrice?: number; // VND (giá gốc để hiển thị giảm giá)
  level: "Cơ bản" | "Nâng cao" | "Toàn diện";
  durationHours: number;
  lessonsCount: number;
  students: number;
  rating: number;
  highlights: string[];
  outcomes: string[];
  audience: string[];
  modules: Module[];
  featured?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string; // chữ cái viết tắt
  course: string;
}

export interface Faq {
  q: string;
  a: string;
}
