import { PortableTextBlock } from "@portabletext/types";
import { BaseData, CreativeBlockData, TagData } from "./types/shared";

export interface PageData extends BaseData {
  heading: string;
  content: PortableTextBlock[];
}

export interface EventData extends BaseData {
  name: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: PortableTextBlock[];
}

export interface OfferingsData extends BaseData {
  heading: string;
  icon: string;
  content: PortableTextBlock[];
}

export interface JournalPostData extends BaseData {
  title: string;
  slug: { current: string };
  body: PortableTextBlock[];
  publishedAt: string;
  categories: { _id: string; title: string; slug: string }[];
  excerpt?: string;
  heroImage?: ImageData;
  thumbnail?: ImageData;
}

// Get only neccessary info
export interface WorkItemData extends BaseData {
  excerpt: string;
  seo: { _type: string; metaTitle: string }; // not needed?
  slug: { _type: string; current: string };
  status: string;
  thumbnail?: ImageData;
  tags: TagData[];
  title: string;
  year: string;
}

// Get only neccessary info
export interface PracticePostPageData extends BaseData {
  // excerpt: string;
  page: CreativeBlockData[];
  seo: { _type: string; metaTitle: string };
  slug: { _type: string; current: string };
  status: string;
  // thumbnail?: ImageData;
  tags?: TagData[];
  title: string;
  year: string;
}
