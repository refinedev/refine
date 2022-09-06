import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

import { FeaturedBlogPostItem } from "../featured-blog-post-item";

export const FeaturedBlogPostItems = ({ items }) => {
    return (
        <div className="font-montserrat mb-12">
            <h2 className="font-extrabold text-3xl font-montserrat">
                Featured Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
