import { client, getClient } from "../client";

export async function getJournalPage() {
  return client.fetch(`*[_type == "journalPage"][0]`);
}

export async function getJournalPosts(isPreview: boolean) {
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
        : undefined,
    )
    .catch((error) => {
      console.error("Error fetching journal posts:", error);
      return [];
    });
}

export async function getJournalPostBySlug(slug: string, isPreview = false) {
  return getClient(isPreview).fetch(
    `*[_type == "journalPost" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, body, tags[]->{ label, slug }, seo
    }`,
    { slug },
    isPreview
      ? {
          perspective: "drafts",
          useCdn: false,
        }
      : undefined,
  );
}
