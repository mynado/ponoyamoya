import { draftMode } from "next/headers";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { getJournalPostBySlug } from "@/lib/sanity/queries/index";
import { notFound } from "next/navigation";

export default async function JournalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  console.log("Journal Page Slug:", slug, "Draft Mode Enabled:", isEnabled);
  const pageData = await getJournalPostBySlug(slug, isEnabled);
  console.log("journal page post: ", pageData);
  if (!pageData) notFound();
  return (
        <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8 max-w-4xl mx-auto">
          {pageData.coverImage && (
            <Image
              src={pageData.coverImage.asset.url}
              alt={pageData.coverImage.alt ? pageData.coverImage.alt : ""}
              width={1920}
              height={1080}
            />
          )}
          <div className="max-w-(--breakpoint-md) mx-auto w-full">
            <h1 className="text-center text-4xl font-bold mb-4">
              {pageData.title}
            </h1>
            {pageData.publishedAt && (
              <p className="text-gray-600">
                {new Date(pageData?.publishedAt).toLocaleDateString("en-SE", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
            <div className="max-w-[--breakpoint-md] text-[1.125rem] w-full prose">
              {pageData.body && <PortableText value={pageData.body} />}
            </div>
          </div>
        </div>
  );
}
