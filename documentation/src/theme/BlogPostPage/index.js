import React from "react";
import clsx from "clsx";
import {
    HtmlClassNameProvider,
    ThemeClassNames,
} from "@docusaurus/theme-common";
import {
    BlogPostProvider,
    useBlogPost,
} from "@docusaurus/theme-common/internal";
import BlogLayout from "@theme/BlogLayout";
import BlogPostPageMetadata from "@theme/BlogPostPage/Metadata";
import TOC from "@theme/TOC";

import { BlogPostPageView, PostPaginator } from "../../components/blog";

function BlogPostPageContent({ children }) {
    const { metadata, toc } = useBlogPost();
    const { frontMatter, relatedPosts, authorPosts } = metadata;
    const {
        hide_table_of_contents: hideTableOfContents,
        toc_min_heading_level: tocMinHeadingLevel,
        toc_max_heading_level: tocMaxHeadingLevel,
    } = frontMatter;

    return (
        <BlogLayout
            toc={
                !hideTableOfContents && toc.length > 0 ? (
                    <TOC
                        className="custom-table-of-contents blog-post-item-shadow rounded-[10px]"
                        toc={toc}
                        minHeadingLevel={tocMinHeadingLevel}
                        maxHeadingLevel={tocMaxHeadingLevel}
                    />
                ) : undefined
            }
        >
            <BlogPostPageView>{children}</BlogPostPageView>
            <br />
            <PostPaginator title="Related Articles" posts={relatedPosts} />
            <br />
            <PostPaginator title="From Same Author" posts={authorPosts} />
        </BlogLayout>
    );
}

export default function BlogPostPage(props) {
    const BlogPostContent = props.content;
    return (
        <BlogPostProvider content={props.content} isBlogPostPage>
            <HtmlClassNameProvider
                className={clsx(
                    ThemeClassNames.wrapper.blogPages,
                    ThemeClassNames.page.blogPostPage,
                )}
            >
                <BlogPostPageMetadata />
                <BlogPostPageContent>
                    <BlogPostContent />
                </BlogPostPageContent>
            </HtmlClassNameProvider>
        </BlogPostProvider>
    );
}
