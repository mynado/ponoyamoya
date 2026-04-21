import "./globals.css";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Work_Sans, Lora } from "next/font/google";
import { getSiteSettings } from "@/lib/sanity/queries/index";
import { urlFor } from "@/lib/sanity/utils";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import Header from "@/components/Header";
import FooterWrapper from "@/components/FooterWrapper";

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: {
      default: settings?.siteName ?? "Pono ya Moya",
      template: `%s — ${settings?.siteName ?? "Pono ya Moya"}`,
    },
    description: settings?.defaultSeo?.metaDescription,
    openGraph: {
      siteName: settings?.siteName ?? undefined,
      type: "website",
      ...(settings?.defaultSeo?.ogImage && {
        images: [
          {
            url: urlFor(settings?.defaultSeo.ogImage)
              .width(1200)
              .height(630)
              .url(),
            width: 1200,
            height: 630,
          },
        ],
      }),
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={workSans.className}
    >
      <body
        className={`${lora.className} bg-background-primary text-text-secondary min-h-screen flex flex-col`}
      >
        <Header settings={settings} />
        <main className="flex-1 mt-10">{children}</main>
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
        <FooterWrapper settings={settings} />
      </body>
    </html>
  );
}
