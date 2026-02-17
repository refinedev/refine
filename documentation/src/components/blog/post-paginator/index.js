import React from "react";
import Link from "@docusaurus/Link";

import { Date } from "@site/src/components/blog/common";
import clsx from "clsx";

export const PostPaginator = ({ posts, title }) => {
  if (!posts?.length) {
    return null;
  }

  return (
    <div
      className={clsx(
        "w-full",
        "mx-auto",
        "px-4",
        "blog-md:px-0",
        "blog-md:max-w-[672px]",
        "blog-lg:max-w-[720px]",
        "pt-16",
        "pb-12",
        "blog-sm:pt-[72px] blog-sm:pb-[120px]",
      )}
    >
      <div className={clsx("w-full")}>
        <h2
          className={clsx(
            "m-0",
            "mb-4",
            "p-0",
            "text-2xl",
            "leading-8",
            "font-semibold",
            "text-zinc-900",
            "dark:text-white",
          )}
        >
          {title}
        </h2>
        <div className={clsx("flex", "flex-col", "not-prose")}>
          {posts.map((post, index) => {
            const isFirstItem = index === 0;

            return (
              <React.Fragment key={post.permalink ?? post.id}>
                {isFirstItem && <PostDivider />}
                <Link
                  to={post.permalink}
                  rel="dofollow"
                  className={clsx(
                    "group",
                    "flex",
                    "w-full",
                    "items-start",
                    "gap-8",
                    "rounded-lg",
                    "-mx-2",
                    "px-2",
                    "py-4",
                    "no-underline",
                    "hover:no-underline",
                    "transition-colors",
                    "duration-200",
                    "hover:bg-zinc-100/80",
                    "dark:hover:bg-zinc-800/60",
                  )}
                >
                  <div
                    className={clsx(
                      "flex-1",
                      "min-w-0",
                      "text-base",
                      "leading-6",
                      "font-medium",
                      "tracking-[-0.004em]",
                      "text-zinc-700",
                      "dark:text-zinc-300",
                      "transition-colors",
                      "duration-200",
                      "group-hover:text-zinc-900",
                      "dark:group-hover:text-white",
                      "line-clamp-2",
                    )}
                  >
                    {post.title}
                  </div>

                  <div
                    className={clsx(
                      "w-[120px]",
                      "h-6",
                      "py-1",
                      "text-right",
                      "text-[10px]",
                      "leading-4",
                      "font-semibold",
                      "uppercase",
                      "tracking-[0.01em]",
                      "text-zinc-500",
                      "dark:text-zinc-400",
                      "transition-colors",
                      "duration-200",
                      "group-hover:text-zinc-700",
                      "dark:group-hover:text-zinc-300",
                      "shrink-0",
                    )}
                  >
                    <Date date={post.date} formattedDate={post.formattedDate} />
                  </div>
                </Link>
                <PostDivider />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PostDivider = () => (
  <div
    className={clsx(
      "blog-content-bleed-16",
      "h-px",
      "bg-zinc-200",
      "dark:bg-zinc-800",
    )}
  />
);
