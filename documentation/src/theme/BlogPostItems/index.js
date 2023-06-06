import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

import BlogPostItem from "@theme/BlogPostItem";

export default function BlogPostItems({
    items,
    component: BlogPostItemComponent = BlogPostItem,
    showTitle = true,
}) {
    return (
        <div className="">
            {showTitle && (
                <h2 className="text-[24px] font-extrabold">All Posts</h2>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
