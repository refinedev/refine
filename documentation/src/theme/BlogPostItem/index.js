import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";

import { Date } from "@site/src/components/blog/common";
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
        <BlogPostItemContainer className={className}>
            <div className="mb-3">
                <Link itemProp="url" to={permalink}>
                    <div className="relative m-0 h-40 hover:brightness-90">
                        <img
                            src={`https://refine-web.imgix.net${frontMatter.image?.replace(
                                "https://refine.ams3.cdn.digitaloceanspaces.com",
                                "",
                            )}?w=500`}
                            alt={title}
                            className="absolute inset-0 h-full w-full rounded-[10px] object-cover transition duration-150 mt-0"
                            loading="lazy"
                        />
                    </div>
                </Link>
            </div>
            <div className="p-3">
                <div className="flex gap-1 mb-2">
                    {tags.map((tag) => (
                        <label
                            className={clsx(
                                "text-xs",
                                "bg-gray-100 dark:bg-gray-700",
                                "text-gray-600 dark:text-gray-400",
                                "rounded",
                                "p-1",
                            )}
                            key={tag.permalink}
                        >
                            {tag.label}
                        </label>
                    ))}
                </div>
                <div className="mb-3">
                    <Link
                        itemProp="url"
                        to={permalink}
                        className="no-underline hover:no-underline"
                        rel="noopener dofollow"
                    >
                        <div
                            className={clsx(
                                "text-color-base",
                                "text-base",
                                "font-lg",
                                "font-bold",
                                "leading-6",
                            )}
                        >
                            {title}
                        </div>
                    </Link>
                    <div className="text-color-base line-clamp-3 mt-1 text-sm leading-6">
                        {description}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href={`/blog/author/${author?.key}`}
                        itemProp="url"
                        className={clsx(
                            "text-gray-600 hover:text-gray-600",
                            "dark:text-gray-400 hover:dark:text-gray-400",
                            "text-xs",
                            "no-underline",
                        )}
                    >
                        {author?.name}
                    </Link>
                    <span
                        className={clsx(
                            "w-[4px] h-[4px] rounded-full",
                            "bg-gray-600 dark:bg-gray-500",
                        )}
                    ></span>
                    <span
                        className={clsx(
                            "text-gray-600 hover:text-gray-600",
                            "dark:text-gray-400 hover:dark:text-gray-400",
                            "text-xs",
                            "no-underline",
                        )}
                    >
                        <Date date={date} formattedDate={formattedDate} />
                    </span>
                </div>
            </div>
        </BlogPostItemContainer>
    );
}
