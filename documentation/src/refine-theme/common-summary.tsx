import clsx from "clsx";
import React from "react";
import { TriangleDownIcon } from "./icons/triangle-down";

export const CommonSummary = ({ children, className, ...props }) => {
    return (
        <summary
            className={clsx(
                "bg-gray-50",
                "dark:bg-gray-800",
                "p-2",
                "flex items-center gap-2",
                "before:hidden",
                "-mb-px",
                "dark:border-b dark:border-b-gray-700",
            )}
            {...props}
        >
            <div
                className={clsx("w-8 h-8", "flex items-center justify-center")}
            >
                <TriangleDownIcon
                    className={clsx("refine-details-triangle", "text-gray-500")}
                />
            </div>
            <span className="text-gray-900 dark:text-gray-0">{children}</span>
        </summary>
    );
};

export default CommonSummary;
