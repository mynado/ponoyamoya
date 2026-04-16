import { sanityClient, sanityClientWithToken } from "./client";
import {
  EventData,
  JournalPostData,
  OfferingsData,
  PageData,
  PracticePostPageData,
  WorkItemData,
} from "./types";

// Pages
export async function getPage(heading: string): Promise<PageData | null> {
  return sanityClient
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
  return sanityClient
    .fetch(`*[_type == "events" && endTime >= now()] | order(startTime asc)`)
    .catch((error) => {
      console.error("Error fetching upcoming events:", error);
      return [];
    });
}

// Offerings
export async function getOfferings(): Promise<OfferingsData[]> {
  return sanityClient
    .fetch(`*[_type == "offerings"] | order(_createdAt asc)`)
    .catch((error) => {
      console.error("Error fetching offerings:", error);
      return [];
    });
}

// // Get only neccessary info
export async function getWorkItems(
  isEnabled: boolean,
): Promise<WorkItemData[]> {
  const client = isEnabled ? sanityClientWithToken : sanityClient;
  return client
    .fetch(
      `*[_type == "portfolioWork"] 
      | order(publishedAt desc)`,
      {},
      isEnabled
        ? {
            perspective: "drafts",
            useCdn: false,
          }
        : undefined,
    )
    .catch((error) => {
      console.error("Error fetching journal posts:", error);
      return [];
    });
}

// // Get only neccessary info
export async function getPracticePostBySlug(
  slug: string,
  isEnabled: boolean,
): Promise<PracticePostPageData | null> {
  const client = isEnabled ? sanityClientWithToken : sanityClient;

  return client
    .fetch(
      `*[_type == "portfolioWork" && slug.current == $slug][0]`,
      { slug },
      isEnabled
        ? {
            perspective: "drafts",
            useCdn: false,
          }
        : undefined,
    )
    .catch((error) => {
      console.error(`Error fetching journal post with slug "${slug}":`, error);
      return null;
    });
}

// Journal Posts
export async function getJournalPostBySlug(
  slug: string,
  isEnabled: boolean,
): Promise<JournalPostData | null> {
  const client = isEnabled ? sanityClientWithToken : sanityClient;

  return client
    .fetch(
      `*[_type == "journalPost" && slug.current == $slug][0]{
      title,
      slug,
      body,
      heroImage,
      publishedAt,
      "categories": categories[]->{
        _id,
        title,
        slug
      }
    }`,
      { slug },
      isEnabled
        ? {
            perspective: "drafts",
            useCdn: false,
          }
        : undefined,
    )
    .catch((error) => {
      console.error(`Error fetching journal post with slug "${slug}":`, error);
      return null;
    });
}

export async function getAllJournalPosts(
  isEnabled: boolean,
): Promise<JournalPostData[]> {
  const client = isEnabled ? sanityClientWithToken : sanityClient;

  return client
    .fetch(
      `*[_type == "journalPost"] 
      | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        excerpt,
        thumbnail,
        "categories": categories[]->{
          _id,
          title,
          "slug": slug.current
        }
      }`,
      {},
      isEnabled
        ? {
            perspective: "drafts",
            useCdn: false,
          }
        : undefined,
    )
    .catch((error) => {
      console.error("Error fetching journal posts:", error);
      return [];
    });
}
