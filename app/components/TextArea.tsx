"use client";
import InlineError from "@/components/InlineError";
import { useState } from "react";

type TextAreaProps = {
  labelText?: string;
  className?: string;
  error: { message: string; isError: boolean };
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({
  labelText = "",
  className = "",
  error = { message: "", isError: false },
  ...rest
}: TextAreaProps) {
  const [isDirty, setIsDirty] = useState(false);
  const handleBlur = () => {
    setIsDirty(true);
  };
  return (
    <div>
      <label htmlFor={rest.id}>{labelText}</label>
      <textarea
        className={`bg-white border border-spiritblue border-2 rounded-md placeholder:text-slate-600 w-full min-h-[200px] p-2 ${className} ${isDirty ? "invalid:border-red-600 valid:border-green-600" : ""} `}
        {...rest}
        onBlur={handleBlur}
      />
      {error.isError && isDirty && <InlineError>{error.message}</InlineError>}
    </div>
  );
}
