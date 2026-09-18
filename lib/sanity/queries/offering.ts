import { getClient } from "../client";
import { OfferingsPageData } from "../types/index";
import { Offering } from "../types/offering";

export async function getOfferingsPageIntro(
  isPreview: boolean,
): Promise<OfferingsPageData | null> {
  return getClient(isPreview)
    .fetch(
      `*[_type == "offeringsPage"][0]`,
      {},
      isPreview
        ? {
            perspective: "drafts",
            useCdn: false,
          }
        : { next: { tags: ["offeringsPage"] } },
    )
    .catch((error) => {
      console.error("Error fetching offerings page:", error);
      return null;
    });
}

export async function getOfferings(
  isPreview: boolean,
): Promise<Offering[] | null> {
  return getClient(isPreview)
    .fetch(
      `
      *[_type == "offering"]
    `,
      {},
      isPreview
        ? {
            perspective: "drafts",
            useCdn: false,
          }
        : { next: { tags: ["offering"] } },
    )
    .catch((error) => {
      console.error("Error fetching offerings:", error);
      return null;
    });
}
