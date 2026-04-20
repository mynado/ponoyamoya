import type { SanitySlug, SanityImageAsset, SeoData, TagData } from "./shared";
import type { PortableTextBlock } from "@portabletext/types";

export interface JournalPost {
  _id: string;
  _type: "journalPost";
  title: string;
  slug: SanitySlug;
  publishedAt?: string;
  excerpt?: string;
  coverImage?: SanityImageAsset;
  tags?: TagData[];
  body: PortableTextBlock[];
  seo?: SeoData;
}

export interface JournalPostPreview {
  _id: string;
  title: string;
  slug: SanitySlug;
  publishedAt?: string;
  excerpt?: string;
  coverImage?: SanityImageAsset;
  tags?: TagData[];
}

export interface JournalPageData {
  _type: "journalPage";
  title?: string;
  intro?: PortableTextBlock[];
  seo?: SeoData;
}
