"use client";
import { Offering } from "@/lib/sanity/types/offering";
import Button from "./Button";
import { useState } from "react";

export default function OfferingCard({
  data,
  i,
}: {
  data: Offering;
  i: number;
}) {
  const [isExtended, setIsExtended] = useState(false);
  return (
    <div
      key={data.title}
      className={`border-t border-stone-200 py-10 grid md:grid-cols-[1fr_auto] gap-6 items-start animate-fade-in`}
      style={{ animationDelay: `${0.1 * (i + 1)}s` }}
    >
      <div>
        <h2 className="text-2xl font-medium mb-3 text-foreground">
          {data.title}
        </h2>
        <p className="leading-relaxed max-w-lg text-sm mb-4">
          {data.shortDescription}
        </p>
        {data.body?.length ? (
          <div
            className="animate-fade-in mb-4"
            style={{ animationDelay: "0.15s" }}
          >
            {isExtended && data.body.length > 1 ? (
              <div className="leading-relaxed max-w-lg text-sm">
                {data.body.map((block, i) => (
                  <p key={i}>{block.children[0].text}</p>
                ))}
              </div>
            ) : null}
            <Button
              type="button"
              typeStyle="tertiary"
              onClick={() => setIsExtended(!isExtended)}
            >
              {isExtended ? "Read less" : "Read more"}
            </Button>
          </div>
        ) : null}
        {data.pricing?.length && data.pricing.length > 1 ? (
          <ul className="mt-4 flex flex-col md:flex-row gap-2 justify-between w-full">
            {data.pricing.map((priceOption) => (
              <li
                key={priceOption._key}
                className="border p-2 w-full bg-spiritwhite"
              >
                <div className="flex flex-col mb-1">
                  <span className="text-lg text-foreground font-medium font-display">
                    {priceOption.amount
                      ? `${priceOption.amount} ${priceOption.currency || "$"}`
                      : ""}
                  </span>
                  <span className="font-medium text-sm uppercase tracking-widest text-spiritred">
                    {priceOption.label}
                  </span>
                </div>
                <span className="text-sm">{priceOption.description}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {data.pricing?.length && data.pricing.length === 1 ? (
          <span className="font-medium text-xs uppercase tracking-widest text-stone-600">
            {data.pricing.map((priceOption) => priceOption.label)}
          </span>
        ) : null}
      </div>
      <span className="text-sm text-primary uppercase tracking-widest whitespace-nowrap">
        {data.duration}
      </span>
    </div>
  );
}
