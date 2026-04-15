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
  const showError = isDirty && error.isError;
  const showValid = isDirty && !error.isError && rest.value;
  return (
    <div>
      <label htmlFor={rest.id} className="block mb-2">
        {labelText}
      </label>
      <textarea
        className={`
          bg-white
          placeholder:text-slate-600 
          w-full 
          min-h-[200px] 
          p-2
          ${showError ? "border-red-600" : ""}
          ${showValid ? "border-green-600" : ""} 
          ${className} 
          `}
        {...rest}
        onBlur={handleBlur}
      />
      {error.isError && isDirty && <InlineError>{error.message}</InlineError>}
    </div>
  );
}
