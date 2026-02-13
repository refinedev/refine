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
        "pt-8",
        "pb-10",
        "blog-sm:pt-[72px] blog-sm:pb-[120px]",
      )}
    >
      <div className={clsx("w-full", "px-4", "blog-sm:px-0")}>
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
              <Link
                to={post.permalink}
                rel="dofollow"
                key={post.permalink ?? post.id}
                className={clsx(
                  "flex",
                  "w-full",
                  "items-start",
                  "gap-8",
                  "px-4",
                  "py-4",
                  "no-underline",
                  "hover:no-underline",
                  "border-zinc-800",
                  "border-b",
                  isFirstItem && "border-t",
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
                    "shrink-0",
                  )}
                >
                  <Date date={post.date} formattedDate={post.formattedDate} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
