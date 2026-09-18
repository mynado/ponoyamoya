import { getAboutPage, getSiteSettings } from "@/lib/sanity/queries/index";
import { buildMetadata } from "@/lib/sanity/seo";
import { PortableText } from "next-sanity";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { draftMode } from "next/dist/server/request/draft-mode";

export async function generateMetadata(): Promise<Metadata> {
  const [pageData, settings] = await Promise.all([
    getAboutPage(false),
    getSiteSettings(),
  ]);

  const siteSettings = settings ?? ({} as NonNullable<typeof settings>);

  return buildMetadata({
    seo: pageData?.seo,
    settings: siteSettings,
    slug: "ndumba",
  });
}

export default async function AboutPage() {
  const { isEnabled } = await draftMode();
  const pageData = await getAboutPage(isEnabled);

  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8">
      <div className="max-w-(--breakpoint-md) mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-medium mb-6 text-foreground animate-fade-in">
          {pageData?.title || "About"}
        </h1>
      </div>
      <div className="max-w-(--breakpoint-md) w-full prose">
        {pageData?.body ? (
          <PortableText value={pageData.body} />
        ) : (
          "Coming soon..."
        )}
      </div>
    </div>
  );
}
