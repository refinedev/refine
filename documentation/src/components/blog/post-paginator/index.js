import React from "react";
import Link from "@docusaurus/Link";

import { Date } from "@site/src/components/blog/common";
import clsx from "clsx";

export const PostPaginator = ({ posts, title }) => {
  if (posts.length < 1) {
    return null;
  }

  return (
    <div
      className={clsx(
        "mx-auto w-full",
        "py-10",
        "blog-sm:py-12",
        "blog-md:py-16",
        "max-w-[512px]",
        "blog-sm:max-w-screen-blog-sm",
        "blog-lg:max-w-screen-content-2xl",
      )}
    >
      <div className="blog-sm:px-6 w-full px-4">
        <h2 className="m-0 mb-4 p-0 pl-4 text-2xl font-semibold text-refine-react-8 dark:text-refine-react-1">
          {title}
        </h2>
        <div className="flex flex-col not-prose">
          {posts.map((post) => (
            <Link
              to={post.permalink}
              rel="dofollow"
              key={post.permalink ?? post.id}
              className={clsx(
                "flex",
                "flex-col",
                "gap-2",
                "p-5",
                "mb-5",
                "rounded-lg",
                "border border-refine-react-3 dark:border-refine-react-6",
                "bg-white dark:bg-refine-react-8",
                "hover:bg-gray-100 dark:hover:bg-refine-react-7",
                "not-prose",
                "no-underline",
              )}
            >
              <div
                to={post.permalink}
                rel="dofollow"
                className={clsx(
                  "font-bold",
                  "text-refine-react-8 dark:text-refine-react-1",
                  "no-underline",
                  "hover:text-gray-800 hover:no-underline dark:hover:text-gray-200",
                )}
              >
                {post.title}
              </div>

              <p
                className={clsx(
                  "font-sm",
                  "text-refine-react-5 dark:text-refine-react-4",
                )}
              >
                {post.description}
              </p>

              <div
                id="post-info"
                className="flex items-center gap-2 text-sm text-refine-react-4 dark:text-refine-react-5"
              >
                <Date date={post.date} formattedDate={post.formattedDate} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
