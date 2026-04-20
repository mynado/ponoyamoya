import { PortableTextBlock } from "@portabletext/types";
import { BaseData } from "./types/shared";

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
