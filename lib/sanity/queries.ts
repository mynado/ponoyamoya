import { client } from "./client";
import { EventData, OfferingsData } from "./types";

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
