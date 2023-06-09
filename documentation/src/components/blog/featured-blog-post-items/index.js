import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

import { FeaturedBlogPostItem } from "../featured-blog-post-item";
import clsx from "clsx";

export const FeaturedBlogPostItems = ({ items }) => {
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
            <h2
                className={clsx(
                    "m-0 p-0",
                    "xl:mb-12 lg:mb-8 mb-10",
                    "xl:text-5xl lg:text-4xl text-xl",
                    "text-gray-900 dark:text-gray-0",
                    "px-0 md:px-6",
                )}
            >
                Featured Posts
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:gap-12 gap-8">
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
