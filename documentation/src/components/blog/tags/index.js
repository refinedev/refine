import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import clsx from "clsx";

export const Tags = () => {
    const { metadata } = useBlogPost();

    return (
        <div className="flex gap-2 ml-2 mb-3">
            {metadata.tags.map((tag) => (
                <Link
                    to={tag.permalink}
                    className={clsx(
                        "text-xs",
                        "bg-gray-100 dark:bg-gray-700",
                        "text-gray-600 dark:text-gray-400",
                        "rounded",
                        "p-1",
                        "no-underline hover:no-underline",
                    )}
                    key={tag.permalink}
                >
                    {tag.label}
                </Link>
            ))}
        </div>
    );
};
