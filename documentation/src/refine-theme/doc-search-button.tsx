import clsx from "clsx";
import React from "react";

type Props = React.ComponentProps<"button">;

export const DocSearchButton = React.forwardRef<HTMLButtonElement, Props>(
    function DocSearchButtonComponent({ className, ...props }, ref) {
        return (
            <button
                ref={ref}
                type="button"
                {...props}
                className={clsx(
                    "text-gray-0",
                    "py-2 pr-2 pl-4",
                    "rounded-lg",
                    "flex items-center justify-between",
                    "bg-gray-700",
                    "gap-5",
                    "text-base",
                    "hover:bg-gray-600",
                    "transition-all",
                    "duration-200",
                    "ease-in-out",
                )}
            >
                <span className="opacity-75">Search in documentation</span>
                <kbd
                    className={clsx(
                        "py-1 px-2",
                        "rounded",
                        "border border-gray-600",
                        "bg-gray-900",
                        "text-sm leading-4",
                        "text-gray-400",
                    )}
                >
                    ⌘K
                </kbd>
            </button>
        );
    },
);
