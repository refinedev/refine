import React from "react";
import clsx from "clsx";
import { AlignLeftIcon } from "./icons/align-left";
import { AlignJustifyIcon } from "./icons/align-justify";

export const CommonWordWrapButton = ({ onClick, isEnabled }) => {
    const Icon = isEnabled ? AlignJustifyIcon : AlignLeftIcon;

    return (
        <button
            type="button"
            onClick={() => onClick()}
            className={clsx(
                "w-8 h-8",
                "flex justify-center items-center",
                "!bg-gray-900",
                "bg-opacity-50",
                "rounded",
                "hover:!bg-gray-900 hover:bg-opacity-75",
                isEnabled && "bg-opacity-100",
                "group",
                "transition-[background-color] duration-200 ease-in-out",
            )}
            aria-label={"Toggle word wrap"}
            title={"Toggle word wrap"}
        >
            <Icon
                className={clsx(
                    "w-4 h-4",
                    "text-gray-500",
                    isEnabled && "rotate-[360deg]",
                    "group-hover:scale-110",
                    "transition-transform duration-200 ease-in-out",
                )}
            />
        </button>
    );
};
