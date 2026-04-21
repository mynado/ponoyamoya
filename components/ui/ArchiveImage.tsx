"use client";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

export function ArchiveImage({
  src,
  alt,
  fallbackColor = "bg-spiritblue",
}: {
  src?: string;
  alt: string;
  fallbackColor?: string;
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return <div className={clsx("absolute inset-0", fallbackColor)} />;
  }
  // TODO: Double check image sizes and loading="eager"
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={clsx(
        "object-cover transition-transform duration-700 group-hover:scale-105",
      )}
      sizes="(max-width: 768px) 50vw, 33vw"
      loading="eager"
      onError={() => setError(true)}
    />
  );
}
