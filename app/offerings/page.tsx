import { PortableText } from "@portabletext/react";
import { getOfferings, getPage } from "@/lib/sanity/queries";
import PaginatedContent from "@/components/PaginatedContent";
import Events from "@/components/Events";
import FlipCard from "@/components/FlipCard";
import FlowerBlue from "@/icons/flower-blue";
import FlowerRed from "@/icons/flower-red";
import FlowerYellow from "@/icons/flower-yellow";

export const revalidate = 60;
type FlowerIcon = "blue" | "red" | "yellow";

export default async function OfferingsPage() {
  const [page, offerings] = await Promise.all([
    getPage("Offerings"),
    getOfferings(),
  ]);
  const flowerIcons: Record<
    FlowerIcon,
    React.ComponentType<{ className?: string }>
  > = {
    blue: FlowerBlue,
    red: FlowerRed,
    yellow: FlowerYellow,
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-16">
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-6 text-foreground animate-fade-in">
          {page?.heading}
        </h1>
        {page?.content && <PortableText value={page.content} />}
      </div>

      <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 max-w-[var(--breakpoint-xl)] w-full">
        {offerings.map((offering) => (
          <div
            key={offering._id}
            className="mb-4 relative w-full max-w-[320px]"
          >
            <FlipCard
              bgIcon={flowerIcons[offering.icon as FlowerIcon]}
              title={offering.heading.toUpperCase()}
              theme={offering.icon as FlowerIcon}
            >
              <PaginatedContent>
                {offering.content.map((block, i) => (
                  <PortableText key={i} value={[block]} />
                ))}
              </PaginatedContent>
            </FlipCard>
          </div>
        ))}
      </div>

      <Events />
    </div>
  );
}
