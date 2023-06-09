import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import {
    PageMetadata,
    HtmlClassNameProvider,
    ThemeClassNames,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";

import { FeaturedBlogPostItems } from "../../components/blog";

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
    const { metadata, tags, items } = props;

    const isFirstPage = metadata.page === 1;

    const featuredPosts = items.filter(
        (post) => post.content.metadata.frontMatter.is_featured === true,
    );

    const paginatedPosts = items.filter(
        (post) => post.content.metadata.frontMatter.is_featured !== true,
    );

    return (
        <BlogLayout>
            {isFirstPage && <FeaturedBlogPostItems items={featuredPosts} />}
            <div
                className={clsx(
                    "xl:max-w-[1008px]",
                    "lg:max-w-[944px]",
                    "md:max-w-[480px]",
                    "sm:max-w-[328px]",
                    "max-w-[328px]",
                    "w-full mx-auto",
                    "hidden lg:block",
                )}
            >
                <div className="border-b border-gray-100"></div>
            </div>
            <BlogPostItems
                items={paginatedPosts}
                tags={tags}
                metadata={metadata}
            />
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
