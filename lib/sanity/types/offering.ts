import { PortableTextBlock } from "next-sanity";
import { SanitySlug } from "./shared";

export interface Offering {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "offering";
  _updatedAt: string;
  body?: PortableTextBlock[];
  duration?: string;
  price?: string;
  shortDescription?: string;
  title: string;
  order: string;
  pricing?: PricingOption[];
  slug: SanitySlug;
}

export interface PricingOption {
  _key: string;
  _type: "priceOption";
  amount?: number;
  currency?: string;
  description?: string;
  label?: string;
}
