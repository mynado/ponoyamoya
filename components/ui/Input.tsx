"use client";
import { useState } from "react";
import InlineError from "./InlineError";

type InputProps = {
  labelText?: string;
  className?: string;
  error?: { message: string; isError: boolean };
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  labelText,
  className = "",
  error = { message: "", isError: false },
  ...rest
}: InputProps) {
  const [isDirty, setIsDirty] = useState(false);

  const showError = isDirty && error.isError;
  const showValid = isDirty && !error.isError && rest.value;

  return (
    <div className="w-full">
      {labelText && (
        <label htmlFor={rest.id} className="block mb-2">
          {labelText}
        </label>
      )}

      <input
        {...rest}
        onBlur={() => setIsDirty(true)}
        aria-invalid={error.isError}
        className={`
          bg-white
          px-2 py-1
          w-full
          transition-colors
          ${showError ? "border-red-600" : ""}
          ${showValid ? "border-green-600" : ""}
          ${className}
        `}
      />

      {error.isError && isDirty && <InlineError>{error.message}</InlineError>}
    </div>
  );
}
