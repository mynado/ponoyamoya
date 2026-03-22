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
    primary: "bg-spiritblue text-white hover:bg-spiritblue-200",
    secondary: "border-spiritblue bg-white text-spiritblue",
    tertiary: "bg-transparent text-spiritblue border-none",
  };
  return (
    <button
      className={clsx(
        typeSettings[typeStyle],
        "py-3 px-6 font-medium font-body cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-90 transition-all duration-200 ease-in-out flex items-center justify-center",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
