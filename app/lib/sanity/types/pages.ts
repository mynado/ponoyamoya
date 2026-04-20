import type { SanityImageAsset, SeoData } from "./shared";
import type { PortableTextBlock } from "@portabletext/types";

export interface AboutPageData {
  _type: "aboutPage";
  title?: string;
  portraitImage?: SanityImageAsset;
  body?: PortableTextBlock[];
  seo?: SeoData;
}

export interface ContactPageData {
  _type: "contactPage";
  title?: string;
  intro?: string;
  email?: string;
  additionalInfo?: PortableTextBlock[];
  seo?: SeoData;
}

export interface SiteSettings {
  _type: "siteSettings";
  siteName?: string;
  tagline?: string;
  logo?: SanityImageAsset;
  navigation?: { label: string; path: string }[];
  socialLinks?: { platform: string; url: string }[];
  footerText?: string;
  defaultSeo?: SeoData;
}
