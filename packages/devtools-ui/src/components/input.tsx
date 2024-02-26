import React from "react";
import clsx from "clsx";

type Props = {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export const Input = ({
  label,
  required,
  placeholder,
  value,
  onChange,
  className,
}: Props) => {
  return (
    <label className={clsx(className)}>
      {label && (
        <span
          className={clsx(
            "re-block",
            "re-mb-2",
            "re-text-gray-300",
            "re-text-base",
            "re-leading-7",
            "re-font-normal",
          )}
        >
          {label}
          {required && <span className="re-text-alt-red">{" * "}</span>}
        </span>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={clsx(
          "re-border",
          "re-border-gray-700",
          "re-bg-transparent",
          "re-rounded",
          "re-placeholder-gray-500",
          "re-text-gray-300",
          "re-outline-none",
          "re-py-2.5",
          "re-px-3",
          "re-w-full",
        )}
      />
    </label>
  );
};
