import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

import { FeaturedBlogPostItem } from "../featured-blog-post-item";
import clsx from "clsx";

export const FeaturedBlogPostItems = ({ items }) => {
    return (
        <div
            className={clsx(
                "py-10",
                "px-4",
                "max-w-[512px]",
                "blog-md:px-7",
                "blog-md:max-w-screen-blog-md",
                "blog-2xl:px-0",
                "blog-2xl:max-w-screen-blog-md",
                "w-full",
                "mx-auto",
                "not-prose",
            )}
        >
            <h2
                className={clsx(
                    "m-0 p-0",
                    "blog-lg:mb-12 blog-md:mb-8 mb-10",
                    "text-xl blog-sm:text-4xl blog-lg:text-5xl",
                    "text-gray-900 dark:text-gray-0",
                    "px-0 blog-sm:px-6",
                    "font-semibold",
                )}
            >
                Featured Posts
            </h2>

            <div className="grid grid-cols-1 blog-md:grid-cols-2 blog-lg:gap-12 gap-8">
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
    );
};
