import { draftMode } from "next/headers";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { getJournalPostBySlug } from "@/lib/sanity/queries/index";
import { notFound } from "next/navigation";
import Link from "next/link";

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
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8 mx-auto">
      <div className="max-w-(--breakpoint-md) mx-auto w-full">
        <Link
          href="/journal"
          className="hover:underline mb-12 inline-block uppercase text-xs"
        >
          &larr; Journal
        </Link>
        <div className="flex items-center gap-4 uppercase text-xs mb-4">
          {pageData.publishedAt && (
            <p>
              {new Date(pageData?.publishedAt).toLocaleDateString("en-SE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          {pageData.tags?.map((tag) => (
            <span key={tag._id}>{tag.label}</span>
          ))}
        </div>
        <h1 className="text-4xl font-bold mb-4">{pageData.title}</h1>
      </div>
      {pageData.coverImage && (
        <Image
          src={pageData.coverImage.asset.url}
          alt={pageData.coverImage.alt ? pageData.coverImage.alt : ""}
          width={1920}
          height={1080}
        />
      )}
      <div className="max-w-(--breakpoint-md) mx-auto text-[1.125rem] w-full prose">
        {pageData.body && <PortableText value={pageData.body} />}
      </div>
    </div>
  );
}
