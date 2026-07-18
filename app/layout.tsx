import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AI Prompt Studio — Tạo prompt cho ảnh, video & ChatGPT",
  description:
    "Công cụ cho người sáng tạo nội dung AI. Nhập ý tưởng, tự động tạo prompt tạo ảnh, prompt Veo/Kling, prompt ChatGPT và prompt Flux/Midjourney.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased">
        {children}
        <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
          AI Prompt Studio · Công cụ tạo nguyên liệu đầu vào cho AI
        </footer>
      </body>
    </html>
  );
}
