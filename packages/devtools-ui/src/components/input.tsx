import React from "react";
import clsx from "clsx";

type Props = {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
};

export const Input = ({
  label,
  required,
  placeholder,
  value,
  onChange,
  className,
  disabled,
  error,
  onBlur,
  loading,
}: Props) => {
  return (
    <label className={clsx(className, "re-relative")}>
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
        disabled={disabled}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        className={clsx(
          "re-border",
          !error && "re-border-gray-700",
          error && "re-border-alt-red/80",
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
      <div className={clsx("re-absolute", "-re-bottom-5")}>
        {error && (
          <span
            className={clsx(
              "re-text-alt-red",
              "re-text-xs",

              "re-block",
            )}
          >
            {error}
          </span>
        )}
      </div>
    </label>
  );
};
