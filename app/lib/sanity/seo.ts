import { Metadata } from "next";
import { SeoData } from "./types/shared";
import { SiteSettings } from "./types/pages";
import { urlFor } from "./utils";

export function buildMetadata({
  seo,
  settings,
  slug,
}: {
  seo?: SeoData;
  settings: SiteSettings;
  slug?: string;
}): Metadata {
  const title =
    seo?.metaTitle ?? settings.defaultSeo?.metaTitle ?? settings.siteName;
  const description =
    seo?.metaDescription ?? settings.defaultSeo?.metaDescription;
  const ogImage = seo?.ogImage ?? settings.defaultSeo?.ogImage;
  const url = slug
    ? `https://ponoyamoya.com/${slug}`
    : "https://ponoyamoya.com";

  return {
    title,
    description,
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      url,
      siteName: settings.siteName ?? undefined,
      type: "website",
      ...(ogImage && {
        images: [
          {
            url: urlFor(ogImage).width(1200).height(630).url(),
            width: 1200,
            height: 630,
            alt: title ?? undefined,
          },
        ],
      }),
    },
  };
}
