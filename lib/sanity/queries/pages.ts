import { client, getClient } from "../client";
import { AboutPageData, ContactPageData, SiteSettings } from "../types/index";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client
    .fetch(
      `*[_type == "siteSettings"][0]`,
      {},
      { next: { tags: ["siteSettings"] } },
    )
    .catch((error) => {
      console.error("Error fetching site settings:", error);
      return null;
    });
}

export async function getAboutPage(
  isPreview: boolean,
): Promise<AboutPageData | null> {
  return getClient(isPreview)
    .fetch(
      `*[_type == "aboutPage"][0]`,
      {},
      isPreview
        ? { perspective: "drafts", useCdn: false }
        : { next: { tags: ["aboutPage"] } },
    )
    .catch((error) => {
      console.error("Error fetching about page:", error);
      return null;
    });
}

export async function getContactPage(
  isPreview: boolean,
): Promise<ContactPageData | null> {
  return getClient(isPreview)
    .fetch(
      `*[_type == "contactPage"][0]`,
      {},
      isPreview
        ? { perspective: "drafts", useCdn: false }
        : { next: { tags: ["contactPage"] } },
    )
    .catch((error) => {
      console.error("Error fetching contact page:", error);
      return null;
    });
}
