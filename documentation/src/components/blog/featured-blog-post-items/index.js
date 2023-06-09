import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

import { FeaturedBlogPostItem } from "../featured-blog-post-item";
import clsx from "clsx";

export const FeaturedBlogPostItems = ({ items }) => {
    return (
        <div className="mb-6 mx-2">
            <h2
                className={clsx(
                    "text-xl lg:text-4xl leading-10 text-gray-900",
                    "dark:text-gray-0",
                    "mb-4 lg:mb-8",
                    "px-4",
                )}
            >
                Featured Posts
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 border-b pb-6 border-gray-200 dark:border-gray-700">
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
