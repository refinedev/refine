import clsx from "clsx";
import React from "react";
import { MagnifierIcon } from "./icons/magnifier";

export type DocSearchButtonProps = React.ComponentProps<"button"> & {
  iconOnly?: boolean;
  iconClassName?: string;
  placeholder?: string;
  isPermanentDark?: boolean;
};

export const DocSearchButton = React.forwardRef<
  HTMLButtonElement,
  DocSearchButtonProps
>(function DocSearchButtonComponent(
  {
    iconOnly = false,
    iconClassName,
    className,
    placeholder,
    isPermanentDark,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={clsx(
        "flex items-center",
        "gap-2",
        "text-sm",
        "transition-[filter]",
        "duration-200",
        "ease-in-out",
        "bg-gray-100 dark:bg-zinc-800",
        "text-gray-500 dark:text-gray-400",
        "rounded-lg",
        {
          "justify-center": iconOnly,
          "hover:brightness-110": iconOnly,
          "w-10 h-10": iconOnly,
          "py-3 px-2.5": !iconOnly,
          "justify-between": !iconOnly,
          "w-[154px] h-10": !iconOnly,
        },
        className,
      )}
    >
      <MagnifierIcon
        className={clsx(
          "text-gray-500 dark:text-zinc-300",
          "w-4 h-4",
          iconClassName,
        )}
      />
      {!iconOnly && (
        <>
          <span
            className={clsx(
              "text-gray-500 dark:text-zinc-300 text-left flex-1",
              "text-base",
            )}
          >
            {placeholder ?? "Search"}
          </span>
          <div
            className={clsx(
              "bg-gray-0 dark:bg-zinc-900",
              "text-gray-500 dark:text-zinc-400",
              "py-0.5 px-1.5",
              "rounded-[0.25rem]",
              "text-xs",
              "font-normal",
            )}
          >
            ⌘K
          </div>
        </>
      )}
    </button>
  );
});
