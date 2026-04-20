"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import { SiteSettings } from "@/lib/sanity/types/pages";

export default function FooterWrapper({
  settings,
}: {
  settings: SiteSettings;
}) {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <Footer settings={settings} />;
}
