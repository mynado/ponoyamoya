export type BaseData = {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
};

type ImageData = {
  _type: string;
  alt: string;
  asset: { _ref: string; _type: string };
};

type TagData = {
  _key: string;
  _ref: string;
  _strengthenOnPublish: { template: { id: string }; type: string };
  _type: string;
  _weak: boolean;
};

export interface MediaBlock {
  _type: "mediaBlock";
  _key: string;
  type: "image" | "video" | "audio" | "embed";
  image?: ImageData;
  videoFile?: { asset: { url: string } };
  audioFile?: { asset: { url: string } };
  embedUrl?: string;
  caption?: string;
  alt?: string;
}

export interface PortableTextBlock {
  children: [];
  style: string;
  _type: string;
  _key: string;
}

export interface CreativeBlockData {
  _type: "creativeBlock";
  _key: string;
  layout: "full" | "narrow" | "left" | "right" | "twoCol" | "collage";
  backgroundColor?: string;
  content: (PortableTextBlock | MediaBlock)[];
}

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
