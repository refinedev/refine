import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

export const CommonHomeButton = () => {
    return (
        <Link
            href="/"
            className={clsx(
                "text-base",
                "text-gray-400",
                // "hover:underline",
                "hover:text-refine-link",
                "transition-colors",
                "duration-200",
                "ease-in-out",
            )}
        >
            refine Home
        </Link>
    );
};
