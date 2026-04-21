import type { PortableTextBlock } from "@portabletext/types";
import {
  BaseData,
  CreativeBlockData,
  SanityImageAsset,
  SanitySlug,
  SeoData,
  TagData,
} from "./shared";

export interface PortfolioWork extends BaseData {
  _type: "portfolioWork";
  _key: string;
  title: string;
  slug: SanitySlug;
  status: "ongoing" | "fragment" | "completed";
  year?: string;
  thumbnail: SanityImageAsset;
  excerpt?: string;
  tags?: TagData[];
  page: CreativeBlockData[];
  seo?: SeoData;
}

// Lighter type for the archive grid — matches the list query projection
export interface PortfolioWorkPreview {
  _id: string;
  title: string;
  slug: SanitySlug;
  status: "ongoing" | "fragment" | "completed";
  year?: string;
  thumbnail: SanityImageAsset;
  excerpt?: string;
  tags?: TagData[];
}

export interface PortfolioPageData {
  _type: "portfolioPage";
  title?: string;
  intro?: PortableTextBlock[];
  seo?: SeoData;
}
