"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import { SiteSettings } from "@/lib/sanity/types/index";

export default function FooterWrapper({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <Footer settings={settings} />;
}
