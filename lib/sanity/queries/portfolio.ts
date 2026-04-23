import { client, getClient } from "../client";
import {
  PortfolioPageData,
  PortfolioWork,
  PortfolioWorkPreview,
} from "../types/index";

export async function getPortfolioPage(): Promise<PortfolioPageData | null> {
  return client
    .fetch(
      `*[_type == "portfolioPage"][0]`,
      {},
      { next: { tags: ["portfolioPage"] } },
    )
    .catch((error) => {
      console.error("Error fetching practice page:", error);
      return null;
    });
}

export async function getPortfolioWorks(
  isPreview: boolean,
): Promise<PortfolioWork[] | PortfolioWorkPreview[] | null> {
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
        : { next: { tags: ["portfolioWork"] } },
    )
    .catch((error) => {
      console.error("Error fetching journal posts:", error);
      return null;
    });
}

export async function getPortfolioWorkBySlug(
  slug: string,
  isPreview: boolean,
): Promise<PortfolioWork | null> {
  return getClient(isPreview)
    .fetch(
      `*[_type == "portfolioWork" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        status,
        year,
        excerpt,
        thumbnail { ..., asset-> },
        tags[]->{ _id, label, slug },
        page[] {
          ...,
          content[] {
            ...,
            image { ..., asset-> },
            audioFile { ..., asset-> },
            videoFile { ..., asset-> },
          }
        },
        seo
      }`,
      { slug },
      isPreview
        ? {
            perspective: "drafts",
            useCdn: false,
          }
        : { next: { tags: ["portfolioWork", `portfolioWork:${slug}`] } },
    )
    .catch((error) => {
      console.error(
        `Error fetching portfolio work with slug "${slug}":`,
        error,
      );
      return null;
    });
}
