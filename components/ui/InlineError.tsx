import React from "react";

export default function InlineError({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-red-600 text-sm">{children}</p>;
}
