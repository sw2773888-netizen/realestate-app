import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Zola — Bất động sản: Mua, Thuê, Bán nhà",
  description:
    "Nền tảng bất động sản giúp bạn tìm nhà bán, nhà cho thuê và kết nối môi giới trên khắp Việt Nam.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="font-sans">
        <FavoritesProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
