import { JournalPost, JournalPostPreview } from "@/lib/sanity/types/index";
import clsx from "clsx";
import { ReactNode } from "react";

const tagColors: { [key: string]: string } = {
  writing: "bg-spiritred/10 text-spiritred",
  curation: "bg-spiritblue/10 text-spiritblue",
  art: "bg-spiritblue/10 text-spiritblue",
  healing: "bg-spirityellow/10 text-spirityellow",
};

export default function Card({
  children,
  postData,
}: {
  children: ReactNode;
  postData: JournalPostPreview | JournalPost; // TODO: More generic type or More specific name for component
}) {
  return (
    <article className="flex flex-col gap-1">
      <div className="flex items-center gap-4">
        {postData.tags && postData.tags.length > 0 && (
          <span
            className={clsx(
              "text-sm px-2 py-1 rounded-4xl uppercase",
              tagColors[postData.tags[0].slug.current],
            )}
          >
            {postData.tags[0].label}
          </span>
        )}
        <span className="text-gray-600">
          {new Date(
            postData.publishedAt ? postData.publishedAt : "",
          ).toLocaleDateString("en-SE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="text-gray-600">Share</span>
      </div>
      {children}
    </article>
  );
}
