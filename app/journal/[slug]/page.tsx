import { getJournalPostBySlug } from "@/lib/sanity/queries";
import { draftMode } from "next/headers";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import getImageUrl from "@/lib/sanity/utils";

export default async function JournalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  console.log("Journal Page Slug:", slug, "Draft Mode Enabled:", isEnabled);
  const pageData = await getJournalPostBySlug(slug, isEnabled);
  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8">
      {pageData?.heroImage && (
        <Image
          src={getImageUrl(pageData.heroImage.asset._ref)}
          alt={pageData.heroImage.alt}
          width={1920}
          height={1080}
        />
      )}
      <div className="max-w-(--breakpoint-md) mx-auto w-full p-4">
        <h1 className="text-center text-4xl font-bold mb-4">
          {pageData?.title}
        </h1>
        {pageData?.publishedAt && (
          <p className="text-gray-600">
            {new Date(pageData?.publishedAt).toLocaleDateString("en-SE", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
        <div className="max-w-[var(--breakpoint-md)] w-full">
          {pageData?.body && <PortableText value={pageData.body} />}
        </div>
      </div>
    </div>
  );
}
