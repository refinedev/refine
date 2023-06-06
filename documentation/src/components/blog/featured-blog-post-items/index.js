import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

import { FeaturedBlogPostItem } from "../featured-blog-post-item";
import clsx from "clsx";

export const FeaturedBlogPostItems = ({ items }) => {
    return (
        <div className="mb-12">
            <h2 className={clsx("text-gray-900", "dark:text-gray-0")}>
                Featured Posts
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
