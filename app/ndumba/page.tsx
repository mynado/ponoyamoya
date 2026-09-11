import OfferingCard from "@/components/ui/OfferingCard";
import {
  getOfferings,
  getOfferingsPageIntro,
} from "@/lib/sanity/queries/index";
import clsx from "clsx";
import { PortableText } from "next-sanity";
import Link from "next/link";

export default async function NdumbaPage() {
  const [pageData, offerings] = await Promise.all([
    getOfferingsPageIntro(),
    getOfferings(),
  ]);

  console.log("offerings", offerings, "pageData", pageData);
  return (
    <div className="flex flex-col items-center justify-center gap-20 mt-16">
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4 mb-4">
        <div className="h-0.5 w-10 bg-spiritblue mb-8"></div>
        <h1 className="text-4xl md:text-5xl font-medium mb-6 text-foreground animate-fade-in">
          {pageData?.title || "Ndumba"}
        </h1>
        <div
          className="leading-relaxed animate-fade-in text-lg"
          style={{ animationDelay: "0.15s" }}
        >
          {pageData?.intro ? (
            <PortableText value={pageData.intro} />
          ) : (
            "Coming soon..."
          )}
        </div>
        <div
          className="flex flex-col md:flex-row gap-12 mt-12 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {pageData?.sections?.map((section, i) => (
            <section key={section._key} className="flex flex-col gap-6">
              <div
                className={clsx(
                  "h-0.5 w-10 mb-4",
                  i === 0 ? "bg-spiritred" : "bg-spirityellow",
                )}
              ></div>
              <h2 className="font-display text-2xl mb-0">{section.heading}</h2>
              {section.content.map((col) => (
                <div key={col._key} className="prose text-md">
                  <PortableText value={col.text} />
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        {offerings
          ?.sort((a, b) => parseInt(a.order) - parseInt(b.order))
          .map((offering, i) => (
            <OfferingCard key={offering._id} data={offering} i={i} />
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
