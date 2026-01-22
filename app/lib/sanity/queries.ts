import { sanityClient } from "./client";
import { EventData, OfferingsData, PageData } from "./types";

// Pages
export async function getPage(heading: string): Promise<PageData | null> {
  return sanityClient.fetch(`*[_type == "pages" && heading == $heading][0]`, {
    heading,
  });
}

// Events
export async function getUpcomingEvents(): Promise<EventData[]> {
  return sanityClient.fetch(
    `*[_type == "events" && endTime >= now()] | order(startTime asc)`,
  );
}

// Offerings
export async function getOfferings(): Promise<OfferingsData[]> {
  return sanityClient.fetch(`*[_type == "offerings"] | order(_createdAt asc)`);
}
