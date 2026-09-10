"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = {
  typeStyle?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  typeStyle = "primary",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const typeSettings = {
    primary: "bg-spiritblue text-white hover:bg-spiritblue-200 py-3 px-6 ",
    secondary: "border-spiritblue bg-white text-spiritblue py-3 px-6 ",
    tertiary: "bg-transparent text-foreground border-none p-0 hover:underline",
  };
  return (
    <button
      className={clsx(
        typeSettings[typeStyle],
        "cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-90 transition-all duration-200 ease-in-out flex items-center justify-center",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
