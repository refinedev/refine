import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import clsx from "clsx";

export const Tags = () => {
  const { metadata } = useBlogPost();

  return (
    <div className="flex flex-wrap gap-2">
      {metadata.tags.map((tag) => (
        <Link
          to={tag.permalink}
          className={clsx(
            "no-underline hover:no-underline",
            "text-xs",
            "rounded-full",
            "py-1",
            "px-3",
            "text-refine-react-8 dark:text-refine-react-3",
            "bg-refine-react-3 dark:bg-refine-react-7",
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
