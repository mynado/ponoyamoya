import { getAboutPage } from "@/lib/sanity/queries/index";
import { PortableText } from "next-sanity";

export default async function AboutPage() {
  const pageData = await getAboutPage();
  console.log("about page data: ", pageData);

  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8">
      <div className="max-w-(--breakpoint-md) mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-6 text-foreground animate-fade-in">
          {pageData?.title || "About"}
        </h1>
      </div>
      <div className="max-w-[var(--breakpoint-md)] w-full">
        {pageData?.body && <PortableText value={pageData.body} />}
      </div>
    </div>
  );
}
