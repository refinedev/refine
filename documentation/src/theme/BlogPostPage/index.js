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
import BlogPostPaginator from "@theme/BlogPostPaginator";
import BlogPostPageMetadata from "@theme/BlogPostPage/Metadata";
import TOC from "@theme/TOC";

import { BlogPostPageView } from "../../components/blog";

function BlogPostPageContent({ sidebar, children }) {
    const { metadata, toc } = useBlogPost();
    const { nextItem, prevItem, frontMatter } = metadata;
    const {
        hide_table_of_contents: hideTableOfContents,
        toc_min_heading_level: tocMinHeadingLevel,
        toc_max_heading_level: tocMaxHeadingLevel,
    } = frontMatter;

    return (
        <BlogLayout
            sidebar={sidebar}
            toc={
                !hideTableOfContents && toc.length > 0 ? (
                    <TOC
                        className="custom-table-of-contents"
                        toc={toc}
                        minHeadingLevel={tocMinHeadingLevel}
                        maxHeadingLevel={tocMaxHeadingLevel}
                    />
                ) : undefined
            }
        >
            <BlogPostPageView>{children}</BlogPostPageView>

            {(nextItem || prevItem) && (
                <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
            )}
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
                <BlogPostPageContent sidebar={props.sidebar}>
                    <BlogPostContent />
                </BlogPostPageContent>
            </HtmlClassNameProvider>
        </BlogPostProvider>
    );
}
