import React from "react";
import clsx from "clsx";

type Props = { version: string };

export const DocVersionBadge = ({ version }: Props) => {
    return (
        <div
            className={clsx(
                "text-xs",
                "dark:text-white",
                "text-gray-900",
                "py-2 px-3",
                "rounded",
                "dark:bg-gray-700",
                "bg-gray-100",
                "font-mono",
            )}
        >
            Version: {version}
        </div>
    );
};
