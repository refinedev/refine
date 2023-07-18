import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import clsx from "clsx";

export const Tags = () => {
    const { metadata } = useBlogPost();

    return (
        <div className="flex flex-wrap gap-2 pb-6 pl-1">
            {metadata.tags.map((tag) => (
                <Link
                    to={tag.permalink}
                    className={clsx(
                        "text-xs",
                        "bg-gray-100 dark:bg-gray-700",
                        "text-gray-600 dark:text-gray-400",
                        "rounded",
                        "py-1",
                        "px-2",
                        "no-underline hover:no-underline",
                        "whitespace-nowrap",
                    )}
                    key={tag.permalink}
                >
                    {tag.label}
                </Link>
            ))}
        </div>
    );
};
