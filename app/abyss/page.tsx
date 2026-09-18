import ArchiveGrid from "@/components/ui/ArchiveGrid";
import {
  getPortfolioPage,
  getPortfolioWorks,
  getSiteSettings,
} from "@/lib/sanity/queries/index";
import { buildMetadata } from "@/lib/sanity/seo";
import { PortableText } from "next-sanity";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { draftMode } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const [pageData, settings] = await Promise.all([
    getPortfolioPage(false),
    getSiteSettings(),
  ]);

  const siteSettings = settings ?? ({} as NonNullable<typeof settings>);

  return buildMetadata({
    seo: pageData?.seo,
    settings: siteSettings,
    slug: "ndumba",
  });
}

export default async function PortfolioPage() {
  const { isEnabled } = await draftMode();
  const [pageData, allWorks] = await Promise.all([
    getPortfolioPage(isEnabled),
    getPortfolioWorks(isEnabled),
  ]);
  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-16">
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="h-0.5 w-10 bg-spiritred mb-8" />
        <h1 className="text-4xl md:text-5xl font-medium mb-6">
          {pageData?.title || "abyss"}
        </h1>
        {pageData?.intro ? (
          <PortableText value={pageData.intro} />
        ) : (
          "Coming soon..."
        )}
      </div>

      {/* Archive Grid */}
      {allWorks && <ArchiveGrid items={allWorks} />}
    </div>
  );
}
