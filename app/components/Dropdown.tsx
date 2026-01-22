"use client";
import { useState } from "react";

type DropdownProps = {
  dropdownOptions?: DropdownOptions;
  labelText?: string;
  className?: string;
  error: { message: string; isError: boolean };
} & React.SelectHTMLAttributes<HTMLSelectElement>;

type DropdownOptions = DropdownOption[];
type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
  hidden?: boolean;
};

export default function Dropdown({
  dropdownOptions = [],
  labelText = "",
  className = "",
  error = { message: "", isError: false },
  ...rest
}: DropdownProps) {
  const [isDirty, setIsDirty] = useState(false);
  const handleBlur = () => {
    setIsDirty(true);
  };
  return (
    <div>
      <label htmlFor={rest.name}>{labelText}</label>
      <select
        className={`bg-white border-spiritblue border-2 rounded-md w-full mt-2 h-9 px-1 ${className} ${isDirty ? "invalid:border-red-600 valid:border-green-600" : ""}`}
        {...rest}
        onBlur={handleBlur}
        required
      >
        {dropdownOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="px-0 disabled:text-slate-600"
            disabled={option.disabled}
            hidden={option.hidden}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
