import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";

import { Date } from "@site/src/components/blog/common";
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

    const author = metadata.authors[0];

    return (
        <BlogPostItemContainer>
            <Link itemProp="url" to={permalink}>
                <div className="relative m-0 h-40 md:h-64 hover:brightness-90">
                    <img
                        src={`https://refine-web.imgix.net${frontMatter.image?.replace(
                            "https://refine.ams3.cdn.digitaloceanspaces.com",
                            "",
                        )}?h=256`}
                        alt={title}
                        className="absolute inset-0 h-full w-full rounded-[10px] object-cover mt-0"
                        loading="lazy"
                    />
                </div>
            </Link>
            <div className="py-4 md:px-6">
                <div className="flex gap-1 mb-2">
                    {tags.map((tag) => (
                        <label
                            className={clsx(
                                "text-xs",
                                "bg-gray-100 dark:bg-gray-700",
                                "text-gray-600 dark:text-gray-400",
                                "rounded",
                                "py-1 px-2",
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
                                "text-sm md:text-2xl xl:text-3xl ",
                                "font-lg",
                                "font-bold",
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
                            "leading-6",
                            "no-underline",
                        )}
                    >
                        <Date date={date} formattedDate={formattedDate} />
                    </span>
                </div>
            </div>
        </BlogPostItemContainer>
    );
};
