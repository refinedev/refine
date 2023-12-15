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
import BlogListPaginator from "@theme/BlogListPaginator";

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
        <BlogLayout showSidebarBanner={false}>
            {/*  <div
                className={clsx(
                    "px-4",
                    "max-w-[512px]",
                    "blog-md:px-7",
                    "blog-md:max-w-screen-blog-md",
                    "blog-2xl:px-0",
                    "blog-2xl:max-w-screen-blog-md",
                    "w-full",
                    "mx-auto",
                )}
            >
                <a
                    href="https://s.refine.dev/hackathon2"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/hackathon-2/hackathon_cover.png" />
                </a>
            </div> */}
            {isFirstPage && <FeaturedBlogPostItems items={featuredPosts} />}
            <div
                className={clsx(
                    "px-4",
                    "max-w-[512px]",
                    "blog-md:px-7",
                    "blog-md:max-w-screen-blog-md",
                    "blog-2xl:px-0",
                    "blog-2xl:max-w-screen-blog-md",
                    "w-full",
                    "mx-auto",
                    "blog-md:block hidden",
                )}
            >
                <div className="border-b border-gray-100 dark:border-gray-700"></div>
            </div>
            <BlogPostItems
                items={paginatedPosts}
                tags={tags}
                metadata={metadata}
            />
            <div
                className={clsx(
                    "max-w-[512px]",
                    "blog-md:max-w-screen-blog-md",
                    "blog-2xl:max-w-screen-blog-md",
                    "w-full",
                    "mx-auto",
                    "blog-md:border-t border-t-gray-200 dark:border-t-gray-700",
                    "blog-sm:mb-16 blog-2xl:mb-20 mb-10",
                )}
            >
                <BlogListPaginator metadata={metadata} />
            </div>
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
