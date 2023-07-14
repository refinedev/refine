import clsx from "clsx";
import React from "react";
import { MagnifierIcon } from "./icons/magnifier";

type Props = React.ComponentProps<"button"> & {
    iconOnly?: boolean;
    iconClassName?: string;
    placeholder?: string;
    isPermanentDark?: boolean;
};

export const DocSearchButton = React.forwardRef<HTMLButtonElement, Props>(
    function DocSearchButtonComponent(
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
                    "rounded-lg",
                    "flex items-center",
                    "gap-5",
                    "text-base",
                    "transition-[filter]",
                    "duration-200",
                    "ease-in-out",
                    {
                        "w-8 h-8 sm:w-10 sm:h-10": iconOnly,
                        "text-gray-500 dark:text-gray-400": iconOnly,
                        "bg-gray-200 dark:bg-gray-700": iconOnly,
                        "justify-center": iconOnly,
                        "hover:brightness-110": iconOnly,
                        "dark:text-gray-0 text-gray-500": !iconOnly,
                        "dark:bg-gray-700 bg-gray-0": !iconOnly,
                        "hover:dark:bg-gray-600": !iconOnly,
                        "justify-between": !iconOnly,
                        "py-2 pr-2 pl-4": !iconOnly,
                        "rounded-full": iconOnly,
                        "rounded-lg": !iconOnly,
                        "!text-gray-400 !bg-gray-700":
                            iconOnly && isPermanentDark,
                        "!text-gray-0 !bg-gray-700 hover:!bg-gray-600":
                            !iconOnly && isPermanentDark,
                    },
                    className,
                )}
            >
                {iconOnly && <MagnifierIcon className={clsx(iconClassName)} />}
                {!iconOnly && (
                    <div
                        className={clsx(
                            "flex items-center justify-between gap-5 w-full",
                        )}
                    >
                        <span className="opacity-75">
                            {placeholder ?? "Search in documentation"}
                        </span>
                        <div
                            className={clsx(
                                "py-1 px-2",
                                "rounded",
                                "border dark:border-gray-600 border-gray-200",
                                "dark:bg-gray-900 bg-gray-100",
                                "dark:text-gray-400 text-gray-500",
                                isPermanentDark &&
                                    "!text-gray-400 !bg-gray-900 !border-gray-600",
                                "shadow-none",
                            )}
                        >
                            ⌘K
                        </div>
                    </div>
                )}
            </button>
        );
    },
);
