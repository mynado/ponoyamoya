import clsx from "clsx";
import { ArchiveImage } from "./ArchiveImage";
import Link from "next/link";
import {
  PortfolioWork,
  PortfolioWorkPreview,
} from "@/lib/sanity/types/portfolio";
import { urlFor } from "@/lib/sanity/utils";
type ArchiveGridProps = {
  items: PortfolioWork[] | PortfolioWorkPreview[];
};

const layoutMap: { [key: string]: string } = {
  ongoing: "row-span-2 col-span-2 md:aspect-[4/3]",
  fragment: "row-span-1 col-span-2 md:aspect-[3/2]",
  completed: "row-span-1 col-span-1 md:aspect-square",
};

const stateMap: { [key: string]: string } = {
  ongoing: "opacity-100",
  completed: "opacity-90",
  fragment: "opacity-70 grayscale",
};

const fallbackColors = ["bg-spiritred", "bg-spiritblue", "bg-spirityellow"];

const getFallbackColor = (index: number) => {
  return fallbackColors[index % fallbackColors.length];
};

export default function ArchiveGrid({ items = [] }: ArchiveGridProps) {
  return (
    <div className="max-w-7xl w-full px-4 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4">
      {items.map((item, i) => {
        const layout = layoutMap[item.status];
        const state = stateMap[item.status];

        return (
          <Link
            key={item.title}
            href={`/practice/${item.slug.current}`}
            className={clsx(
              "relative group overflow-hidden rounded-sm animate-fade-in",
              layout,
              state,
            )}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {/* Image */}
            <ArchiveImage
              src={urlFor(item.thumbnail).width(1200).height(630).url()} // TODO: Double check image sizes
              alt={item.title}
              fallbackColor={getFallbackColor(i)}
            />

            {/* Soft spiritual overlay */}
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply group-hover:bg-black/10 transition" />

            {/* Hover narrative layer */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-2">
                  {item.year} · {item.status}
                </span>
                <h3 className="text-white text-sm md:text-base font-medium leading-snug drop-shadow">
                  {item.title}
                </h3>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag._id}
                      className="text-[10px] uppercase tracking-wider text-white/50"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
