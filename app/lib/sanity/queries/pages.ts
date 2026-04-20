import { client } from "../client";

export async function getSiteSettings() {
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

export async function getAboutPage() {
  return client
    .fetch(`*[_type == "aboutPage"][0]`, {}, { next: { tags: ["aboutPage"] } })
    .catch((error) => {
      console.error("Error fetching about page:", error);
      return null;
    });
}

export async function getContactPage() {
  return client
    .fetch(
      `*[_type == "contactPage"][0]`,
      {},
      { next: { tags: ["contactPage"] } },
    )
    .catch((error) => {
      console.error("Error fetching contact page:", error);
      return null;
    });
}
