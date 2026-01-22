"use client";
import { useState } from "react";
import InlineError from "@/components/InlineError";

type InputProps = {
  labelText?: string;
  className?: string;
  error: { message: string; isError: boolean };
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  labelText = "",
  className = "",
  error = { message: "", isError: false },
  ...rest
}: InputProps) {
  const [isDirty, setIsDirty] = useState(false);

  const handleBlur = () => {
    setIsDirty(true);
  };
  return (
    <div className="w-full">
      {labelText && <label htmlFor={rest.id}>{labelText}</label>}
      <input
        className={`bg-white border-spiritblue border-2 rounded-md px-2 py-1 w-full placeholder:text-slate-600 ${className} ${isDirty ? "invalid:border-red-600 valid:border-green-600" : ""} `}
        {...rest}
        onBlur={handleBlur}
      />
      {error.isError && isDirty && <InlineError>{error.message}</InlineError>}
    </div>
  );
}
