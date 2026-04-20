import { client, getClient } from "../client";

export async function getPortfolioPage() {
  return client.fetch(`*[_type == "portfolioPage"][0]`);
}

export async function getPortfolioWorks(isPreview: boolean) {
  return getClient(isPreview)
    .fetch(
      `
    *[_type == "portfolioWork"] | order(order asc) {
      _id, title, slug, status, year, thumbnail, excerpt, tags[]->
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

export async function getPortfolioWorkBySlug(slug: string, isPreview: boolean) {
  return getClient(isPreview)
    .fetch(
      `*[_type == "portfolioWork" && slug.current == $slug][0]`,
      { slug },
      isPreview
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
