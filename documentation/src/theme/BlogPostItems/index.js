import React from "react";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";
import TagsList from "@theme/TagsList";

import BlogPostItem from "@theme/BlogPostItem";
import clsx from "clsx";

export default function BlogPostItems({
    items,
    tags,
    component: BlogPostItemComponent = BlogPostItem,
    showTitle = true,
}) {
    return (
        <div>
            {showTitle && (
                <div className="mb-5">
                    <div className="flex flex-row items-center justify-between mb-4">
                        <h2 className={clsx("basis-1/2 text-4xl m-0 p-0")}>
                            All Posts
                        </h2>
                        <p className="basis-1/8 pl-4 text-gray-500">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit. Donec odio. Quisque volutpat mattis eros.
                            Nullam malesuada erat ut turpis. Suspendisse urna
                            nibh, viverra non, semper suscipit, posuere a, pede.
                        </p>
                    </div>
                    <div>
                        <TagsList tags={tags} />
                    </div>
                </div>
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
