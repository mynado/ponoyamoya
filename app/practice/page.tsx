import ArchiveGrid from "@/components/ui/ArchiveGrid";
import {
  getPortfolioPage,
  getPortfolioWorks,
} from "@/lib/sanity/queries/portfolio";
import { PortableText } from "next-sanity";
import { draftMode } from "next/headers";

export default async function PracticePage() {
  const { isEnabled } = await draftMode();
  console.log("Draft Mode Enabled:", isEnabled);
  const page = await getPortfolioPage();
  const allPosts = await getPortfolioWorks(isEnabled);
  console.log("All Practice Posts:", allPosts);
  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-16">
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="h-[2px] w-10 bg-spiritred mb-8" />
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-6">
          {page.title}
        </h1>
        <p className="text-lg font-body max-w-2xl leading-relaxed">
          <PortableText value={page.intro[0]} />
        </p>
      </div>

      {/* Archive Grid */}
      <ArchiveGrid items={allPosts} />
    </div>
  );
}
