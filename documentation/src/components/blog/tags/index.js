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
            "text-zinc-900 dark:text-zinc-300",
            "bg-zinc-200 dark:bg-zinc-700",
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
