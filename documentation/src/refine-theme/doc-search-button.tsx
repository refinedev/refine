import clsx from "clsx";
import React from "react";

type Props = React.ComponentProps<"button"> & {
    placeholder?: string;
};

export const DocSearchButton = React.forwardRef<HTMLButtonElement, Props>(
    function DocSearchButtonComponent(
        { className, placeholder, ...props },
        ref,
    ) {
        return (
            <button
                ref={ref}
                type="button"
                {...props}
                className={clsx(
                    "dark:text-gray-0 text-gray-500",
                    "py-2 pr-2 pl-4",
                    "rounded-lg",
                    "flex items-center justify-between",
                    "dark:bg-gray-700 bg-gray-0",
                    "gap-5",
                    "text-base",
                    "hover:dark:bg-gray-600",
                    "transition-all",
                    "duration-200",
                    "ease-in-out",
                    className,
                )}
            >
                <span className="opacity-75">
                    {placeholder ?? "Search in documentation"}
                </span>
                <kbd
                    className={clsx(
                        "py-1 px-2",
                        "rounded",
                        "border dark:border-gray-600 border-gray-200",
                        "dark:bg-gray-900 bg-gray-100",
                        "text-sm leading-4",
                        "dark:text-gray-400 text-gray-500",
                    )}
                >
                    ⌘K
                </kbd>
            </button>
        );
    },
);
