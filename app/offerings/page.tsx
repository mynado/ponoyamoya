import { PortableText } from "@portabletext/react";
import { getOfferings, getPage } from "@/lib/sanity/queries";
import PaginatedContent from "@/components/PaginatedContent";
import Events from "@/components/Events";

export const revalidate = 60;

const offerings = [
  {
    title: "Ancestral Consultation",
    description:
      "A deep spiritual reading connecting you with your ancestors for guidance, clarity, and healing. Sessions are held in a sacred space with traditional ceremony.",
    duration: "45 min",
    color: "border-spiritred",
  },
  // {
  //   title: "Herbal Medicine",
  //   description:
  //     "Custom-blended traditional herbal remedies prepared with intention and ancestral knowledge. Each blend is crafted for your specific needs.",
  //   duration: "Ongoing",
  //   color: "border-spiritred",
  // },
  {
    title: "Spiritual Cleansing",
    description:
      "A purification ritual to remove negative energies, restore balance, and create space for renewal and growth.",
    duration: "45 min",
    color: "border-spirityellow",
  },
  {
    title: "Home Fortification",
    description:
      "Home fortification spiritually cleanses, protects and strengthens one’s home.",
    duration: "Varies",
    color: "border-spiritred",
  },
  // {
  //   title: "Dream Interpretation",
  //   description:
  //     "Understanding the messages carried in your dreams through the lens of traditional wisdom and ancestral communication.",
  //   duration: "45 min",
  //   color: "border-spiritblue",
  // },
  {
    title: "Art Commissions",
    description:
      "Bespoke artworks created through a collaborative process, infused with spiritual intention and personal meaning.",
    duration: "By project",
    color: "border-spiritblue",
  },
  {
    title: "Curated Experiences",
    description:
      "Workshops, exhibitions, and gatherings that bring together healing, art, and community in sacred space.",
    duration: "Varies",
    color: "border-spirityellow",
  },
];

export default async function OfferingsPage() {
  // const [page, offerings] = await Promise.all([
  //   getPage("Offerings"),
  //   getOfferings(),
  // ]);
  // const flowerIcons: Record<
  //   FlowerIcon,
  //   React.ComponentType<{ className?: string }>
  // > = {
  //   blue: FlowerBlue,
  //   red: FlowerRed,
  //   yellow: FlowerYellow,
  // };

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-16">
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-6 text-foreground animate-fade-in">
          Offerings
        </h1>
        <p
          className="text-lg font-body max-w-2xl leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          Each offering is a doorway — a meeting point between the spiritual and
          the tangible, designed to bring healing, insight, and creative
          expression into your life.
        </p>
      </div>

      {/* <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 max-w-[var(--breakpoint-xl)] w-full">
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
      </div> */}

      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        {offerings.map((offering, i) => (
          <div
            key={offering.title}
            className={`border-t py-10 grid md:grid-cols-[1fr_auto] gap-6 items-start animate-fade-in ${offering.color}`}
            style={{ animationDelay: `${0.1 * (i + 1)}s` }}
          >
            <div>
              <h2 className="text-2xl font-display font-medium mb-3 text-foreground">
                {offering.title}
              </h2>
              <p className="font-body leading-relaxed max-w-lg">
                {offering.description}
              </p>
            </div>
            <span className="text-sm text-primary font-body uppercase tracking-widest whitespace-nowrap">
              {offering.duration}
            </span>
          </div>
        ))}
      </div>

      <Events />
    </div>
  );
}
