"use client";
import { Offering } from "@/lib/sanity/types/offering";
import Button from "./Button";
import { useState } from "react";
import Link from "next/dist/client/link";
import { PortableText } from "next-sanity";
import { clsx } from "clsx";

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
      className={`border-t border-stone-300 py-10 grid md:grid-cols-[1fr_auto] gap-6 items-start animate-fade-in`}
      style={{ animationDelay: `${0.1 * (i + 1)}s` }}
    >
      <div>
        <h2 className="text-2xl font-medium mb-3 text-foreground">
          {data.title}
        </h2>
        <p className="leading-relaxed max-w-lg mb-4">{data.shortDescription}</p>
        {data.body?.length ? (
          <div
            className="animate-fade-in mb-4"
            style={{ animationDelay: "0.15s" }}
          >
            {isExtended && data.body.length > 1 ? (
              <div className="leading-relaxed max-w-lg">
                <PortableText value={data.body} />
              </div>
            ) : null}
            <Button
              type="button"
              typeStyle="tertiary"
              className="uppercase text-xs tracking-widest my-8"
              onClick={() => setIsExtended(!isExtended)}
            >
              {isExtended ? "Read less" : "Read more"}
            </Button>
          </div>
        ) : null}
        {data.pricing?.length ? (
          <ul className="mt-4 flex flex-col md:flex-row md:flex-wrap gap-2 justify-between w-full">
            {data.pricing.map((priceOption) => (
              <li
                key={priceOption._key}
                className={clsx(
                  "border p-2 w-full bg-spiritwhite animate-fade-in",
                  priceOption.type === "fixed"
                    ? "md:max-w-[calc(50%-0.5rem)] flex flex-col gap-1"
                    : "",
                  priceOption.type === "inquiry" || priceOption.type === "free"
                    ? "max-w-max flex items-center justify-center pt-3"
                    : "",
                )}
              >
                <div className="flex flex-col mb-1">
                  <span className="text-lg text-foreground font-semibold font-display">
                    {priceOption.amount
                      ? `${priceOption.amount} ${priceOption.currency || "$"}`
                      : ""}
                  </span>
                  <span className="font-sm text-sm uppercase tracking-widest text-spiritred">
                    {priceOption.label}
                  </span>
                </div>
                <span className="text-sm">{priceOption.description}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="flex flex-col gap-4 items-end justify-between pt-2">
        <span className="text-sm text-primary uppercase tracking-widest whitespace-nowrap">
          {data.duration}
        </span>
        <Link
          href={`/contact?subject=${data.slug.current}`}
          className="uppercase border bg-spiritblue text-spiritwhite py-2 px-4 w-max min-w-25 flex items-center justify-center hover:border-spiritblue hover:opacity-90 transition-colors"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
