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
                    "flex items-center",
                    "gap-2",
                    "text-sm",
                    "transition-[filter]",
                    "duration-200",
                    "ease-in-out",
                    "bg-gray-200 dark:bg-gray-700",

                    {
                        "py-2.5 pr-2.5 pl-3": !iconOnly,
                        "py-2.5 px-2.5": iconOnly,
                        "text-gray-500 dark:text-gray-400": iconOnly,
                        "justify-center": iconOnly,
                        "hover:brightness-110": iconOnly,
                        "dark:text-gray-0 text-gray-500": !iconOnly,
                        "justify-between": !iconOnly,
                        "rounded-full": iconOnly,
                        "rounded-[32px]": !iconOnly,
                    },
                    className,
                )}
            >
                <MagnifierIcon
                    className={clsx(
                        "text-gray-500 dark:text-gray-400",
                        "w-3 h-3 landing-md:w-4 landing-md:h-4",
                        iconClassName,
                    )}
                />
                {!iconOnly && (
                    <>
                        <span className="text-gray-500 dark:text-gray-400 w-[66px] text-left">
                            {placeholder ?? "Search"}
                        </span>
                        <div
                            className={clsx(
                                "bg-gray-0 dark:bg-gray-800",
                                "text-gray-500 dark:text-gray-400",
                                "py-0.5 px-1.5",
                                "rounded-2xl",
                                "text-xs",
                            )}
                        >
                            ⌘K
                        </div>
                    </>
                )}
            </button>
        );
    },
);
