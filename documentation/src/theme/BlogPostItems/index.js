import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";
import TagsList from "@theme/TagsList";

import BlogPostItem from "@theme/BlogPostItem";
import clsx from "clsx";

export default function BlogPostItems({
  items,
  tags,
  component: BlogPostItemComponent = BlogPostItem,
  isAuthorPage,
  isTagsPage,
}) {
  return (
    <div className={clsx("w-full", "bg-white dark:bg-refine-react-8")}>
      <div
        className={clsx(
          "blog-sm:max-w-[592px]",
          "blog-md:max-w-[656px]",
          "blog-lg:max-w-[896px]",
          "blog-max:max-w-[1200px]",
          "w-full",
          "px-6 blog-sm:px-0",
          "pt-14 blog-md:pt-12",
          "pb-6",
          "mx-auto",
          "not-prose",
        )}
      >
        {!isAuthorPage && !isTagsPage && (
          <>
            <div
              className={clsx(
                "flex flex-row blog-lg:flex-col justify-between",
                "items-center blog-lg:items-start",
                "not-prose",
                "px-6",
                "mb-6 blog-lg:mb-12",
                "gap-6",
              )}
            >
              <h2
                className={clsx(
                  "!m-0 !mt-0 !mb-0 p-0",
                  "blog-lg:mb-12 blog-md:mb-8 mb-8",
                  "text-2xl blog-sm:text-[32px] blog-sm:leading-10",
                  "text-refine-react-8 dark:text-refine-react-3",
                  "font-semibold",
                  "whitespace-nowrap",
                )}
              >
                All Posts
              </h2>
              <TagsList tags={tags} />
            </div>
          </>
        )}

        <div
          className={clsx(
            "grid grid-cols-1 blog-md:grid-cols-2 blog-max:grid-cols-3",
            "gap-6",
          )}
        >
          {items.map(({ content: BlogPostContent }) => (
            <BlogPostProvider
              key={BlogPostContent.metadata.permalink}
              content={BlogPostContent}
            >
              <BlogPostItemComponent>
                <BlogPostContent />
              </BlogPostItemComponent>
            </BlogPostProvider>
          ))}
        </div>
      </div>
    </div>
  );
}
