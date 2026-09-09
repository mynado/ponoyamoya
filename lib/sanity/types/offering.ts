export interface Offering {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "offering";
  _updatedAt: string;
  duration?: string;
  price?: string;
  shortDescription?: string;
  title: string;
  order: string;
  pricing?: {
    _key: string;
    _type: "priceOption";
    amount?: number;
    currency?: string;
    description?: string;
    label?: string;
  }[];
}
