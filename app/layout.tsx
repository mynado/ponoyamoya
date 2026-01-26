import "./globals.css";
import Header from "./components/Header";
import FooterWrapper from "./components/FooterWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pono ya Moya: Anti-Disciplinary Platform for Ancestral Healing",
  description:
    "Pono ya Moya is Nkgono Mantwa's practice (sangoma & moporofeta), channeled with and through Mmabatho Thobejane. Spiritual counsel centered on ancestral healing.",
  keywords: [
    "Pono ya Moya",
    "Mmabatho Thobejane",
    "ancestral healing",
    "sangoma",
    "moporofeta",
    "spiritual counsel",
    "healing practices ",
    "traditional healer",
  ],
  openGraph: {
    title: "Pono ya Moya: Anti-Disciplinary Platform for Ancestral Healing",
    description:
      "Pono ya Moya is Nkgono Mantwa's practice (sangoma & moporofeta), channeled with and through Mmabatho Thobejane. Spiritual counsel centered on ancestral healing.",
    url: "https://ponoyamoya.com",
    siteName: "Pono ya Moya",
    images: [
      {
        url: "https://ponoyamoya.com/og-altar-session.jpg",
        width: 1200,
        height: 630,
        alt: "Pono ya Moya",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}
