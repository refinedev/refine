import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

import { FeaturedBlogPostItem } from "../featured-blog-post-item";

export const FeaturedBlogPostItems = ({ items }) => {
    return (
        <div className="font-montserrat mb-12">
            <h2 className="font-montserrat text-[24px] font-extrabold">
                FEATURED POSTS
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
