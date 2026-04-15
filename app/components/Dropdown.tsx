"use client";
import { useState } from "react";
import InlineError from "@/components/InlineError";

type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
  hidden?: boolean;
};

type DropdownProps = {
  dropdownOptions?: DropdownOption[];
  labelText?: string;
  className?: string;
  error?: { message: string; isError: boolean };
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Dropdown({
  dropdownOptions = [],
  labelText,
  className = "",
  error = { message: "", isError: false },
  ...rest
}: DropdownProps) {
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

      <select
        {...rest}
        onBlur={() => setIsDirty(true)}
        aria-invalid={error.isError}
        className={`
          bg-white
          w-full
          h-9
          px-2
          transition-colors
          ${showError ? "border-red-600" : ""}
          ${showValid ? "border-green-600" : ""}
          ${className}
        `}
      >
        {dropdownOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            hidden={option.hidden}
            className="disabled:text-slate-600"
          >
            {option.label}
          </option>
        ))}
      </select>

      {error.isError && isDirty && <InlineError>{error.message}</InlineError>}
    </div>
  );
}
