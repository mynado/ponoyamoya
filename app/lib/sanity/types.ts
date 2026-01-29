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

export interface PageData extends BaseData {
  heading: string;
  content: { children: []; style: string; _type: string }[];
}

export interface EventData extends BaseData {
  name: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: { children: []; style: string; _type: string }[];
}

export interface OfferingsData extends BaseData {
  heading: string;
  icon: string;
  content: { children: []; style: string; _type: string }[];
}

export interface JournalPostData extends BaseData {
  title: string;
  slug: { current: string };
  body: { children: []; style: string; _type: string }[];
  publishedAt: string;
  excerpt?: string;
  heroImage?: ImageData;
  thumbnail?: ImageData;
}
