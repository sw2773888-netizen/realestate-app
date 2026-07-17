import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AI Script Studio — Viết kịch bản bán hàng TikTok",
  description:
    "Công cụ tạo Hook, kịch bản 30–60s, lời thoại, CTA, caption và hashtag cho video bán hàng TikTok theo từng ngành.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
