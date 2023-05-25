import clsx from "clsx";
import React from "react";
import { TriangleDownIcon } from "./icons/triangle-down";

export const DocVersionDropdown = () => {
    return (
        <button
            className={clsx(
                "appearance-none",
                "border-none",
                "focus:outline-none",
                "flex",
                "items-center",
                "justify-center",
                "gap-2",
                "bg-gray-800",
                "hover:bg-gray-700",
                "transition-colors",
                "duration-200",
                "ease-in-out",
                "select-none",
                "py-2 pl-2",
                "rounded-lg",
            )}
        >
            <span className={clsx("text-gray-400", "text-base", "block")}>
                4.xx.xx
            </span>
            <TriangleDownIcon className="text-gray-500" />
        </button>
    );
};
