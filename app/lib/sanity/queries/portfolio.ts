import { client } from "../client";

// export async function getWorkItems(
//   isEnabled: boolean,
// ): Promise<WorkItemData[]> {
//   const client = isEnabled ? client : sanityClient;
//   return client
//     .fetch(
//       `*[_type == "portfolioWork"]
//       | order(publishedAt desc)`,
//       {},
//       isEnabled
//         ? {
//             perspective: "drafts",
//             useCdn: false,
//           }
//         : undefined,
//     )
//     .catch((error) => {
//       console.error("Error fetching journal posts:", error);
//       return [];
//     });
// }

export async function getPortfolioPage() {
  return client.fetch(`*[_type == "portfolioPage"][0]`);
}

export async function getPortfolioWorks(isEnabled: boolean) {
  return client
    .fetch(
      `
    *[_type == "portfolioWork"] | order(order asc) {
      _id, title, slug, status, year, thumbnail, excerpt, tags[]->
    }
  `,
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

export async function getPortfolioWorkBySlug(slug: string, isEnabled: boolean) {
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

// export async function getPortfolioWorkBySlugTemp(slug: string) {
//   return client.fetch(
//     `*[_type == "portfolioWork" && slug.current == $slug][0] {
//       _id, title, slug, status, year, excerpt,
//       page[] {
//         ...,
//         content[] {
//           ...,
//           image { ..., asset-> },
//           audioFile { ..., asset-> },
//           videoFile { ..., asset-> },
//         }
//       },
//       tags[]->{ label, slug },
//       seo
//     }`,
//     { slug },
//   );
// }
