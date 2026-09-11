import ArchiveGrid from "@/components/ui/ArchiveGrid";
import {
  getPortfolioPage,
  getPortfolioWorks,
} from "@/lib/sanity/queries/index";
import { PortableText } from "next-sanity";
import { draftMode } from "next/headers";

export default async function PortfolioPage() {
  const { isEnabled } = await draftMode();
  console.log("Draft Mode Enabled:", isEnabled);
  const [pageData, allWorks] = await Promise.all([
    getPortfolioPage(),
    getPortfolioWorks(isEnabled),
  ]);
  console.log("Portfolio Page Data: ", pageData);
  console.log("All Works: ", allWorks);
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
