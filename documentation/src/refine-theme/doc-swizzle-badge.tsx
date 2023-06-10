import clsx from "clsx";
import React from "react";

export const SwizzleBadge = () => {
    return (
        <div
            className={clsx(
                "text-xs",
                "text-gray-0",
                "py-2 px-3",
                "rounded",
                "bg-refine-blue",
                "font-mono",
            )}
        >
            Swizzle Ready
        </div>
    );
};
