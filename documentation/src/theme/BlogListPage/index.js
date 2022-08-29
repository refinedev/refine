import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
    PageMetadata,
    HtmlClassNameProvider,
    ThemeClassNames,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import BlogListPaginator from "@theme/BlogListPaginator";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";

import { FeaturedBlogPostItems } from "../../components/blog";

const FEATURED_POSTS_COUNT = 4;

function BlogListPageMetadata(props) {
    const { metadata } = props;
    const {
        siteConfig: { title: siteTitle },
    } = useDocusaurusContext();
    const { blogDescription, blogTitle, permalink } = metadata;
    const isBlogOnlyMode = permalink === "/";
    const title = isBlogOnlyMode ? siteTitle : blogTitle;
    return (
        <>
            <PageMetadata title={title} description={blogDescription} />
            <SearchMetadata tag="blog_posts_list" />
        </>
    );
}

function BlogListPageContent(props) {
    const { metadata, items, sidebar } = props;

    const featuredPosts = items.filter(({ content }) => {
        if (content.metadata.frontMatter.is_featured) {
            return content;
        }
    });

    const notFeaturedPosts = items.filter(({ content }) => {
        if (!content.metadata.frontMatter.is_featured) {
            return content;
        }
    });

    if (featuredPosts.length < FEATURED_POSTS_COUNT) {
        const missingCount = FEATURED_POSTS_COUNT - featuredPosts.length;

        for (let index = 0; index < missingCount; index++) {
            featuredPosts.push(notFeaturedPosts[index]);
            notFeaturedPosts.splice(index, 1);
        }
    }

    return (
        <BlogLayout sidebar={sidebar}>
            <FeaturedBlogPostItems items={featuredPosts} />
            <br />
            <br />
            <BlogPostItems items={notFeaturedPosts} />
            <BlogListPaginator metadata={metadata} />
        </BlogLayout>
    );
}

export default function BlogListPage(props) {
    return (
        <HtmlClassNameProvider
            className={clsx(
                ThemeClassNames.wrapper.blogPages,
                ThemeClassNames.page.blogListPage,
            )}
        >
            <BlogListPageMetadata {...props} />
            <BlogListPageContent {...props} />
        </HtmlClassNameProvider>
    );
}
