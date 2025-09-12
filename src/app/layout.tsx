import type { Metadata } from "next";
import { Noto_Sans_KR, Jua } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const jua = Jua({
  variable: "--font-jua",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "채아의 한글 나라",
  description: "5세 어린이를 위한 재미있는 한글 학습 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.variable} ${jua.variable} antialiased bg-gradient-to-br from-pink-100 to-purple-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
