import "./globals.css";
import Header from "./components/Header";
import FooterWrapper from "./components/FooterWrapper";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "./components/DisableDraftMode";
import { VisualEditing } from "next-sanity/visual-editing";
import { Work_Sans, Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={workSans.className}
    >
      <body
        className={`${lora.className} bg-background-primary text-text-secondary min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 mt-12 md:mt-10">{children}</main>
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
        <FooterWrapper />
      </body>
    </html>
  );
}
