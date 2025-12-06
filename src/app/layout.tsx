import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "言い訳AI | 最強の言い訳ジェネレーター",
  description: "状況に応じた自然で説得力のある言い訳を3タップで生成。遅刻、宿題、バイト休み...あらゆるピンチを切り抜けろ。",
  keywords: ["言い訳", "AI", "ジェネレーター", "遅刻", "宿題", "バイト"],
  authors: [{ name: "iiwakeai" }],
  openGraph: {
    title: "言い訳AI | 最強の言い訳ジェネレーター",
    description: "状況に応じた自然で説得力のある言い訳を3タップで生成",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "言い訳AI | 最強の言い訳ジェネレーター",
    description: "状況に応じた自然で説得力のある言い訳を3タップで生成",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7335986906427166"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-grid`}
      >
        {children}
      </body>
    </html>
  );
}
