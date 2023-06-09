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
}) {
    return (
        <div
            className={clsx(
                "xl:max-w-[1008px] xl:py-20",
                "lg:max-w-[944px] lg:py-16",
                "md:max-w-[480px] py-10",
                "sm:max-w-[328px]",
                "max-w-[328px]",
                "w-full mx-auto",
            )}
        >
            {!isAuthorPage && (
                <>
                    <div
                        className={clsx(
                            "flex flex-col lg:flex-row items-start justify-between",
                            "px-0 md:px-6",
                            "mb-8 md:mb-12",
                        )}
                    >
                        <h2
                            className={clsx(
                                "m-0 p-0",
                                "xl:mb-12 lg:mb-8 mb-8",
                                "xl:text-5xl lg:text-4xl text-xl",
                                "text-gray-900 dark:text-gray-0",
                            )}
                        >
                            All Posts
                        </h2>
                        <p
                            className={clsx(
                                "text-sm md:text-base xl:text-xl",
                                "lg:max-w-[624px]",
                            )}
                        >
                            <b>refine technical blog</b> - a resource for
                            refine, front-end ecosystem, and web development.
                            Here, we publish insightful articles that demystify
                            complex concepts, explore new trends, and provide
                            helpful tips to enhance your coding journey.
                        </p>
                    </div>
                    <TagsList tags={tags} />
                </>
            )}

            <div
                className={clsx(
                    "grid",
                    "grid-cols-1 lg:grid-cols-3",
                    "gap-4 xl:gap-12",
                    "py-6 lg:py-12",
                    isAuthorPage && "-mt-28",
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
    );
}
