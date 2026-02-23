import { sanityClient, sanityClientWithToken } from "./client";
import { EventData, JournalPostData, OfferingsData, PageData } from "./types";

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

// Journal Posts
export async function getJournalPostBySlug(
  slug: string,
  isEnabled: boolean,
): Promise<JournalPostData | null> {
  const client = isEnabled ? sanityClientWithToken : sanityClient;

  return client.fetch(
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
  );
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
