import clsx from "clsx";
import React from "react";

type Props = React.ComponentProps<"button">;

export const CommonDocSearchButton = React.forwardRef<HTMLButtonElement, Props>(
    function CommonDocSearchButtonComponent({ className, ...props }, ref) {
        return (
            <button
                ref={ref}
                type="button"
                {...props}
                className={clsx(
                    "dark:text-gray-0 text-gray-500",
                    "dark:bg-gray-700 bg-gray-0",
                    "pl-3 pr-1.5",
                    "py-1.5",
                    "rounded-lg",
                    "w-36",
                    "text-xs",
                    "leading-5",
                    "flex items-center justify-between",
                    "dark:hover:brightness-110",
                    "transition-[filter]",
                    "duration-200",
                    "ease-in-out",
                    "group",
                )}
            >
                <span className="opacity-50">Search</span>
                <kbd
                    className={clsx(
                        "h-5",
                        "border dark:border-gray-600 border-gray-200",
                        "py-px px-1",
                        "rounded",
                        "dark:bg-gray-900 bg-gray-100",
                        "dark:text-gray-400 text-gray-500",
                        "text-sm leading-4",
                        "tracking-wide",
                        "text-refine-kbd",
                        "font-sans",
                        "shadow-none",
                    )}
                >
                    ⌘K
                </kbd>
            </button>
        );
    },
);
