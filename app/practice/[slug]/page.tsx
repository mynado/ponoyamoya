import CreativeBlock from "@/components/ui/CreativeBlock";
import { getPortfolioWorkBySlug } from "@/lib/sanity/queries/index";
import { CreativeBlockData } from "@/lib/sanity/types/index";
import { draftMode } from "next/headers";

export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  console.log("Practice Page Slug:", slug, "Draft Mode Enabled:", isEnabled);
  const pageData = await getPortfolioWorkBySlug(slug, isEnabled);
  console.log("Practice Post Data: ", pageData);
  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8 max-w-4xl mx-auto">
      <h1>{pageData?.title}</h1>
      {pageData?.page ? (
        pageData.page.map((item: CreativeBlockData) => (
          <CreativeBlock key={item._key} block={item} />
        ))
      ) : (
        <p>no data</p>
      )}
    </div>
  );
}
