import { getPage } from "@/lib/sanity/queries";
import { PortableText } from "@portabletext/react";

export default async function AboutPage() {
  const pageData = await getPage("About");

  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8">
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        <h1 className="text-center text-4xl font-bold">About</h1>
      </div>
      <div className="max-w-[var(--breakpoint-md)] w-full">
        {pageData?.content && <PortableText value={pageData.content} />}
      </div>
    </div>
  );
}
