import { client, getClient } from "../client";
import { IntroPageData } from "../types/index";
import { Offering } from "../types/offering";

export async function getOfferingsPageIntro(): Promise<IntroPageData | null> {
  return client
    .fetch(
      `*[_type == "offeringsPage"][0]`,
      {},
      { next: { tags: ["offeringsPage"] } },
    )
    .catch((error) => {
      console.error("Error fetching offerings page:", error);
      return null;
    });
}

export async function getOfferings(): Promise<Offering[] | null> {
  return getClient(false)
    .fetch(
      `
      *[_type == "offering"]
    `,
    )
    .catch((error) => {
      console.error("Error fetching offerings:", error);
      return null;
    });
}
