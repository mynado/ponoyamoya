import { client, getClient } from "../client";
import {
  JournalPageData,
  JournalPost,
  JournalPostPreview,
} from "../types/journal";

export async function getJournalPage(): Promise<JournalPageData | null> {
  return client
    .fetch(
      `*[_type == "journalPage"][0]`,
      {},
      { next: { tags: ["journalPage"] } },
    )
    .catch((error) => {
      console.error("Error fetching journal page:", error);
      return null;
    });
}

export async function getJournalPosts(
  isPreview: boolean,
): Promise<JournalPostPreview[] | null> {
  return getClient(isPreview)
    .fetch(
      `
      *[_type == "journalPost"] | order(publishedAt desc) {
        _id, title, slug, publishedAt, excerpt, coverImage, tags[]->
      }
    `,
      {},
      isPreview
        ? {
            perspective: "drafts",
            useCdn: false,
          }
        : { next: { tags: ["journalPost"] } },
    )
    .catch((error) => {
      console.error("Error fetching journal posts:", error);
      return null;
    });
}

export async function getJournalPostBySlug(
  slug: string,
  isPreview = false,
): Promise<JournalPost | null> {
  return getClient(isPreview)
    .fetch(
      `*[_type == "journalPost" && slug.current == $slug][0] {
        _id, title, slug, publishedAt, body, coverImage { ..., asset-> }, tags[]->{ label, slug }, seo,
      }`,
      { slug },
      isPreview
        ? {
            perspective: "drafts",
            useCdn: false,
          }
        : { next: { tags: ["journalPost", `journalPost:${slug}`] } },
    )
    .catch((error) => {
      console.error("Error fetching journal post by slug:", error);
      return null;
    });
}
