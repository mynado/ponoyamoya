import { client } from "./client";
import { EventData, OfferingsData, PageData } from "./types";

// Pages
export async function getPage(heading: string): Promise<PageData | null> {
  return client
    .fetch(`*[_type == "pages" && heading == $heading][0]`, {
      heading,
    })
    .catch((error) => {
      console.error(`Error fetching page with heading "${heading}":`, error);
      return null;
    });
}

// Events
export async function getUpcomingEvents(): Promise<EventData[]> {
  return client
    .fetch(`*[_type == "events" && endTime >= now()] | order(startTime asc)`)
    .catch((error) => {
      console.error("Error fetching upcoming events:", error);
      return [];
    });
}

// Offerings
export async function getOfferings(): Promise<OfferingsData[]> {
  return client
    .fetch(`*[_type == "offerings"] | order(_createdAt asc)`)
    .catch((error) => {
      console.error("Error fetching offerings:", error);
      return [];
    });
}
