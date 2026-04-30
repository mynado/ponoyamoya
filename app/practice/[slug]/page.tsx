import CreativeBlock from "@/components/ui/CreativeBlock";
import { getPortfolioWorkBySlug } from "@/lib/sanity/queries/index";
import { CreativeBlockData } from "@/lib/sanity/types/index";
import { draftMode } from "next/headers";
import Link from "next/link";

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
  // TODO: Arrow icon
  return (
    <>
      {pageData ? (
        <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8 mx-auto">
          <div className="max-w-5xl w-full">
            <Link href="/practice" className="hover:underline mb-12 inline-block uppercase text-xs">
              &larr; Practice
            </Link>
            <div className="flex justify-between items-center gap-4 w-full text-xs mb-4">
              <div className="flex items-center gap-4 uppercase">
                <span>{pageData.status}</span>
                {pageData.tags?.map((tag) => (
                  <span key={tag._id}>{tag.label}</span>
                ))}
              </div>
              <span>{pageData.year}</span>
            </div>
            <h1 className="text-6xl font-bold mb-4">{pageData.title}</h1>
            <p className="text-lg italic">{pageData.excerpt}</p>
          </div>
          {pageData.page.map((item: CreativeBlockData) => (
            <CreativeBlock key={item._key} block={item} />
          ))}
        </div>
      ) : (
        <p>No data</p>
      )}
    </>
  );
}
