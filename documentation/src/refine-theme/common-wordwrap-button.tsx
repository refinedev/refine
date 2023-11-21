import clsx from "clsx";
import React from "react";
import { AlignJustifyIcon } from "./icons/align-justify";
import { AlignLeftIcon } from "./icons/align-left";

export const CommonWordWrapButton = ({ onClick, isEnabled }) => {
    const Icon = isEnabled ? AlignJustifyIcon : AlignLeftIcon;

    return (
        <button
            type="button"
            onClick={() => onClick()}
            className={clsx(
                "w-8 h-8",
                "flex justify-center items-center",
                "bg-gray-50",
                "hover:bg-gray-100",
                "dark:bg-gray-800",
                "dark:hover:bg-gray-900",
                "rounded",
                "group",
                "transition-[background-color] duration-200 ease-in-out",
            )}
            aria-label={"Toggle word wrap"}
            title={"Toggle word wrap"}
        >
            <Icon
                className={clsx(
                    "w-4 h-4",
                    "text-gray-400",
                    "dark:text-gray-500",
                    isEnabled && "rotate-[360deg]",
                    "transition-all duration-200 ease-in-out",
                )}
            />
        </button>
    );
};
