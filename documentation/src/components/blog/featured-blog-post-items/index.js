import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

import { FeaturedBlogPostItem } from "../featured-blog-post-item";
import clsx from "clsx";

export const FeaturedBlogPostItems = ({ items }) => {
    return (
        <div className="mb-6">
            <h2
                className={clsx(
                    "text-4xl leading-10 text-gray-900",
                    "dark:text-gray-0",
                    "mt-3",
                )}
            >
                Featured Posts
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 border-b pb-6 border-gray-200 dark:border-gray-700">
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
