import {
  getOfferings,
  getOfferingsPageIntro,
} from "@/lib/sanity/queries/index";
import { PortableText } from "next-sanity";
import Link from "next/link";

export default async function NdumbaPage() {
  const [pageData, offerings] = await Promise.all([
    getOfferingsPageIntro(),
    getOfferings(),
  ]);
  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-16">
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        <div className="h-0.5 w-10 bg-spiritblue mb-8"></div>
        <h1 className="text-4xl md:text-5xl font-medium mb-6 text-foreground animate-fade-in">
          {pageData?.title || "Ndumba"}
        </h1>
        <div
          className="text-lg max-w-2xl leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          {pageData?.intro ? (
            <PortableText value={pageData.intro} />
          ) : (
            "Coming soon..."
          )}
        </div>
      </div>
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        {offerings?.map((offering, i) => (
          <div
            key={offering.title}
            className={`border-t border-stone-200 py-10 grid md:grid-cols-[1fr_auto] gap-6 items-start animate-fade-in`}
            style={{ animationDelay: `${0.1 * (i + 1)}s` }}
          >
            <div>
              <h2 className="text-2xl font-medium mb-3 text-foreground">
                {offering.title}
              </h2>
              <p className="leading-relaxed max-w-lg">
                {offering.shortDescription}
              </p>
            </div>
            <span className="text-sm text-primary uppercase tracking-widest whitespace-nowrap">
              {offering.duration}
            </span>
          </div>
        ))}
        <p
          className="border-t border-stone-200 pt-10 mb-8 text-lg leading-relaxed animate-fade-in"
          style={{ animationDelay: `${0.1 * ((offerings?.length ?? 0) + 1)}s` }}
        >
          To book a consultation or inquire about healing work:
        </p>
        <Link
          href="/contact"
          className="uppercase border border-spiritblack text-spiritblack block py-2 px-4 w-max hover:border-spiritblue hover:text-spiritblue transition-colors"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
