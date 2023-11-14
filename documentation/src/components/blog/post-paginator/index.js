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
                <h2 className="m-0 mb-4 p-0 pl-4 text-2xl font-semibold text-gray-900 dark:text-gray-200">
                    {title}
                </h2>
                <div className="flex flex-col">
                    {posts.map((post) => (
                        <div
                            key={post.permalink ?? post.id}
                            className={clsx(
                                "flex",
                                "flex-col",
                                "p-5",
                                "mb-5",
                                "rounded-md",
                                "bg-gray-50 dark:bg-gray-800",
                            )}
                        >
                            <Link
                                to={post.permalink}
                                rel="dofollow"
                                className={clsx(
                                    "font-bold",
                                    "text-gray-800 dark:text-gray-200",
                                    "no-underline",
                                    "hover:text-gray-800 hover:no-underline dark:hover:text-gray-200",
                                    "mb-2",
                                )}
                            >
                                {post.title}
                            </Link>

                            <p
                                className={clsx(
                                    "font-sm",
                                    "text-gray-700 dark:text-gray-400",
                                )}
                            >
                                {post.description}
                            </p>

                            <div
                                id="post-info"
                                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                                <Date
                                    date={post.date}
                                    formattedDate={post.formattedDate}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
