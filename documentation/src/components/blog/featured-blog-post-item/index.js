import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";

import { Date as DateComponent } from "@site/src/components/blog/common";
import clsx from "clsx";

export const FeaturedBlogPostItem = () => {
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

  return (
    <BlogPostItemContainer>
      <Link
        itemProp="url"
        to={permalink}
        className={clsx("block", "w-full h-auto", "aspect-[592/334]")}
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
              "absolute inset-0 mt-0 h-full w-full rounded-[10px] object-cover",
            )}
            loading="lazy"
          />
        </div>
      </Link>
      <div className="px-4 py-4 md:px-6  md:py-6">
        <div className={clsx("flex flex-wrap items-center", "mb-6", "gap-3")}>
          {tags.map((tag) => (
            <Link
              className={clsx(
                "text-xs",
                "bg-refine-react-3 dark:bg-refine-react-7",
                "text-refine-react-8 dark:text-refine-react-3",
                "no-underline",
                "rounded-full",
                "px-2 py-1",
              )}
              href={tag.permalink}
              key={tag.permalink}
            >
              {tag.label}
            </Link>
          ))}
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
                "text-gray-700 dark:text-refine-react-3",
                "text-xl",
                "font-lg",
                "font-bold",
              )}
            >
              {title}
            </div>
          </Link>
          <div
            className={clsx(
              "line-clamp-3",
              "text-gray-700 dark:text-refine-react-4",
              "text-sm",
            )}
          >
            {description}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "text-gray-600 dark:text-refine-react-5",
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
};
