import { draftMode } from "next/headers";

export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  console.log("Practice Page Slug:", slug, "Draft Mode Enabled:", isEnabled);
  //   TODO: Get page data from Sanity
  //   const pageData = await getJournalPostBySlug(slug, isEnabled);
  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8 max-w-4xl mx-auto"></div>
  );
}
