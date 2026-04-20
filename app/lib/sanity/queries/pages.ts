import { client } from "../client";

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getAboutPage() {
  return client.fetch(`*[_type == "aboutPage"][0]`);
}

export async function getContactPage() {
  return client.fetch(`*[_type == "contactPage"][0]`);
}
