import React from "react";
import clsx from "clsx";

type Props = { version: string };

export const DocVersionBadge = ({ version }: Props) => {
    return (
        <div
            className={clsx(
                "text-xs",
                "text-gray-0",
                "py-2 px-3",
                "rounded",
                "bg-gray-700",
                "font-mono",
            )}
        >
            Version: {version}
        </div>
    );
};
