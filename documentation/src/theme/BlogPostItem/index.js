import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";

import { Date as DateComponent } from "@site/src/components/blog/common";
import clsx from "clsx";

export default function BlogPostItem({ className }) {
  const { metadata } = useBlogPost();
  const {
    permalink,
    title,
    date,
    formattedDate,
    frontMatter,
    description,
    tags,
  } = metadata;

  const author = metadata.authors[0];

  return (
    <BlogPostItemContainer
      className={clsx(
        className,
        "bg-zinc-50 dark:bg-zinc-800",
        "p-4",
        "rounded-xl",
      )}
    >
      <Link
        itemProp="url"
        to={permalink}
        className={clsx("block", "w-full h-auto", "aspect-[363/208]")}
      >
        <div
          className={clsx(
            "not-prose relative m-0 hover:brightness-90",
            "h-full w-full",
          )}
        >
          <img
            src={`https://refine-web.imgix.net${frontMatter.image?.replace(
              "https://refine.ams3.cdn.digitaloceanspaces.com",
              "",
            )}?h=668`}
            alt={title}
            className={clsx(
              "absolute inset-0 mt-0 h-full w-full rounded-[0.25rem] object-cover",
            )}
            loading="lazy"
          />
        </div>
      </Link>
      <div className="px-4 py-4">
        <div className={clsx("flex flex-wrap items-center", "mb-6", "gap-2")}>
          {tags.map((tag) => {
            const shouldUppercase = tag.label.length <= 3;
            const isRefineTag =
              tag.label.toLowerCase() === "refine" ||
              tag.label.toLowerCase() === "refine-core" ||
              "refine core";

            return (
              <Link
                className={clsx(
                  shouldUppercase && "uppercase",
                  isRefineTag && "capitalize",
                  "text-xs",
                  "font-medium",
                  "text-zinc-900 dark:text-white",
                  "bg-zinc-200 dark:bg-zinc-700",
                  "no-underline",
                  "rounded-sm",
                  "px-1.5 py-1",
                  "tracking-[-0.06em]",
                )}
                href={tag.permalink}
                key={tag.permalink}
              >
                {tag.label}
              </Link>
            );
          })}
        </div>
        <div className="mb-4">
          <Link
            itemProp="url"
            to={permalink}
            className="no-underline hover:no-underline"
            rel="noopener dofollow"
          >
            <div
              className={clsx(
                "mb-4",
                "text-zinc-900 dark:text-white",
                "text-base",
                "font-semibold",
                "tracking-[-0.04em]",
              )}
            >
              {title}
            </div>
          </Link>
          <div
            className={clsx(
              "line-clamp-3",
              "text-zinc-600 dark:text-zinc-400",
              "text-sm",
              "tracking-[-0.07em]",
            )}
          >
            {description}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "text-zinc-600 dark:text-zinc-400",
              "text-xs",
              "leading-6",
              "no-underline",
            )}
          >
            <DateComponent date={date} formattedDate={formattedDate} />
          </span>
        </div>
      </div>
    </BlogPostItemContainer>
  );
}
