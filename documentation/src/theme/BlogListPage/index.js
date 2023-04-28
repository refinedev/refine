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
import TagsList from "@theme/TagsList";

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
    const { metadata, items } = props;

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
            {/*    {isFirstPage && (
                <Link to="https://s.refine.dev/hackathon">
                    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-01-06-hackaton-january/social.png"></img>
                </Link>
            )} */}
            <br />
            <TagsList tags={props.tags} />
            <br />
            <br />

            <BlogPostItems items={paginatedPosts} />
            <br />
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
