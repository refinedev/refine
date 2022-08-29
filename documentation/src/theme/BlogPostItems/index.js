import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

import BlogPostItem from "@theme/BlogPostItem";

export default function BlogPostItems({
    items,
    component: BlogPostItemComponent = BlogPostItem,
}) {
    return (
        <div className="grid grid-cols-3 gap-6">
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
    );
}
