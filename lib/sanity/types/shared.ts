import { PortableTextBlock } from "@portabletext/types";

export type BaseData = {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
};

export type ImageData = {
  _type: string;
  alt: string;
  asset: { _ref: string; _type: string };
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
  alt: string;
}

export interface CreativeBlockData {
  _type: "creativeBlock";
  _key: string;
  layout: "full" | "narrow" | "left" | "right" | "twoCol" | "collage";
  backgroundColor?: string;
  content: (PortableTextBlock | MediaBlock)[];
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityImageAsset {
  _type: "image";
  asset: {
    _id: string;
    _ref: string;
    url: string;
  };
  hotspot?: { x: number; y: number };
  alt?: string;
}

export interface SeoData {
  _type: "seo";
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImageAsset;
}

export interface TagData {
  _type: "tag";
  _id: string;
  _key: string;
  _strengthenOnPublish: { template: { id: string }; type: string };
  label: string;
  slug: SanitySlug;
}
