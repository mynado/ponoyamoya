import { getJournalPostBySlug } from "@/lib/sanity/queries";
import { draftMode } from "next/headers";
import { PortableText } from "@portabletext/react";

export default async function JournalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  console.log("Journal Page Slug:", slug, "Draft Mode Enabled:", isEnabled);
  const pageData = await getJournalPostBySlug(slug, isEnabled);
  console.log("Journal Page Data:", pageData);
  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8">
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        <h1 className="text-center text-4xl font-bold">{pageData?.title}</h1>
        <p>{pageData?.publishedAt}</p>
        <div className="max-w-[var(--breakpoint-md)] w-full">
          {pageData?.body && <PortableText value={pageData.body} />}
        </div>
      </div>
    </div>
  );
}
