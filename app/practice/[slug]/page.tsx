import CreativeBlock from "@/components/ui/CreativeBlock";
import { getPracticePostBySlug } from "@/lib/sanity/queries";
import { draftMode } from "next/headers";

export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  console.log("Practice Page Slug:", slug, "Draft Mode Enabled:", isEnabled);
  const pageData = await getPracticePostBySlug(slug, isEnabled);
  console.log("Practice Post Data: ", pageData);
  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8 max-w-4xl mx-auto">
      {pageData && pageData.page ? (
        pageData.page.map((item) => (
          <div key={item._key}>
            <CreativeBlock item={item} />
          </div>
        ))
      ) : (
        <p>no data</p>
      )}
    </div>
  );
}
