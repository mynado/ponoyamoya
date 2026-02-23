"use client";

import { JournalPostData } from "@/lib/sanity/types";
import clsx from "clsx";
import { ReactNode } from "react";

const tagColors: Record<string, string> = {
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
  postData: JournalPostData;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-4">
        {postData.categories && postData.categories.length > 0 && (
          <span
            className={clsx(
              "text-sm px-2 py-1 rounded-4xl uppercase",
              tagColors[postData.categories[0].slug],
            )}
          >
            {postData.categories[0].title}
          </span>
        )}
        <span className="text-gray-600">
          {new Date(postData.publishedAt).toLocaleDateString("en-SE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="text-gray-600">Share</span>
      </div>
      {children}
    </div>
  );
}
