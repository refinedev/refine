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
            <div>
                <Link itemProp="url" to={permalink}>
                    <div className="not-prose relative m-0 h-40 hover:brightness-90">
                        <img
                            src={`https://refine-web.imgix.net${frontMatter.image?.replace(
                                "https://refine.ams3.cdn.digitaloceanspaces.com",
                                "",
                            )}?h=160`}
                            alt={title}
                            className="absolute inset-0 mt-0 h-full w-full rounded-[10px] object-cover transition duration-150"
                            loading="lazy"
                        />
                    </div>
                </Link>
            </div>
            <div className="p-4">
                <div
                    className={clsx(
                        "mb-2 flex gap-1 md:mb-4",
                        "flex flex-wrap items-center",
                    )}
                >
                    {tags.map((tag) => (
                        <Link
                            className={clsx(
                                "text-xs",
                                "bg-gray-100 dark:bg-gray-700",
                                "text-gray-600 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-400",
                                "no-underline",
                                "rounded",
                                "px-2 py-1",
                            )}
                            href={tag.permalink}
                            key={tag.permalink}
                        >
                            {tag.label}
                        </Link>
                    ))}
                </div>
                <div className="mb-2 md:mb-4">
                    <Link
                        itemProp="url"
                        to={permalink}
                        className="no-underline hover:no-underline"
                        rel="noopener dofollow"
                    >
                        <div
                            className={clsx(
                                "text-xs sm:text-sm md:text-2xl lg:text-base 2xl:text-xl",
                                "text-gray-700 dark:text-gray-200",
                                "font-lg",
                                "font-bold",
                                "leading-6",
                            )}
                        >
                            {title}
                        </div>
                    </Link>
                    <div
                        className={clsx(
                            "text-xs md:text-base lg:text-sm 2xl:text-lg",
                            "mt-2 md:mt-4",
                            "line-clamp-3 text-gray-700 dark:text-gray-300",
                        )}
                    >
                        {description}
                    </div>
                </div>

                <div className="flex items-center gap-2">
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
