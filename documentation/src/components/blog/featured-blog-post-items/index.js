import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

import { FeaturedBlogPostItem } from "../featured-blog-post-item";
import clsx from "clsx";

export const FeaturedBlogPostItems = ({ items }) => {
  return (
    <div
      className={clsx(
        "w-screen",
        "bg-refine-react-1 dark:bg-refine-react-dark-code",
      )}
    >
      <div
        className={clsx(
          "blog-sm:max-w-[592px]",
          "blog-md:max-w-[656px]",
          "blog-lg:max-w-[896px]",
          "blog-max:max-w-[1200px]",
          "w-full",
          "mx-auto",
          "px-6 blog-sm:px-0",
          "py-6 blog-md:py-12",
          "not-prose",
        )}
      >
        <h2
          className={clsx(
            "m-0 p-0",
            "px-6",
            "mb-6 blog-lg:mb-12",
            "text-2xl blog-sm:text-[32px] blog-sm:leading-10",
            "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
            "text-refine-blue drop-shadow-[0_0_30px_rgba(51,51,255,0.3)]",
            "font-semibold",
          )}
        >
          Featured Posts
        </h2>

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
              <FeaturedBlogPostItem />
            </BlogPostProvider>
          ))}
        </div>
      </div>
    </div>
  );
};
