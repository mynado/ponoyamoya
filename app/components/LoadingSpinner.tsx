"use client";

import Spinner from "@/icons/spinner";

export default function LoadingSpinner({ className = "", ...rest }) {
  return (
    <>
      <Spinner className={`animate-spin ${className}`} {...rest} />
    </>
  );
}
