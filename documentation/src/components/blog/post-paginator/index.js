import React from "react";
import Link from "@docusaurus/Link";

import { Date } from "@site/src/components/blog/common";
import clsx from "clsx";

export const PostPaginator = ({ posts, title }) => {
    if (posts.length < 1) {
        return null;
    }

    return (
        <div className="py-3 px-3 md:py-6 md:px-14">
            <h2 className="text-gray-900 dark:text-gray-200 text-2xl font-semibold p-0 m-0 mb-4">
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
                                "hover:no-underline hover:text-gray-800",
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
                            className="text-gray-600 dark:text-gray-400 text-sm flex gap-2 items-center"
                        >
                            <Link
                                to={`/blog/author/${post.authors[0]?.key}`}
                                itemProp="url"
                                id="author-name"
                                className="text-gray-600 dark:text-gray-400 no-underline hover:no-underline hover:text-gray-600"
                            >
                                {post.authors[0]?.name}
                            </Link>
                            <span className="w-[4px] h-[4px] rounded-full bg-gray-600 dark:bg-gray-500"></span>
                            <Date
                                date={post.date}
                                formattedDate={post.formattedDate}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
