import ArchiveGrid from "@/components/ui/ArchiveGrid";
import {
  getPortfolioPage,
  getPortfolioWorks,
} from "@/lib/sanity/queries/index";
import { PortableText } from "next-sanity";
import { draftMode } from "next/headers";

export default async function PracticePage() {
  const { isEnabled } = await draftMode();
  console.log("Draft Mode Enabled:", isEnabled);
  const [page, allWorks] = await Promise.all([
    getPortfolioPage(),
    getPortfolioWorks(isEnabled),
  ]);
  console.log("All Practice Posts:", allWorks);
  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-16">
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="h-0.5 w-10 bg-spiritred mb-8" />
        <h1 className="text-4xl md:text-5xl font-medium mb-6">
          {page?.title || "Practice"}
        </h1>
        {page?.intro && <PortableText value={page.intro} />}
      </div>

      {/* Archive Grid */}
      {allWorks && <ArchiveGrid items={allWorks} />}
    </div>
  );
}
