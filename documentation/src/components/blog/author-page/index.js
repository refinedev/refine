import React from "react";
import BlogLayout from "@theme/BlogLayout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PageMetadata } from "@docusaurus/theme-common";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";

import { AuthorCardWithProps } from "@site/src/components/blog";

const BlogListPageMetadata = () => {
    const {
        siteConfig: { title, tagline },
    } = useDocusaurusContext();
    return (
        <>
            <PageMetadata title={title} description={tagline} />
            <SearchMetadata tag="author_blog_posts_list" />
        </>
    );
};

const AuthorPage = (props) => {
    const { items } = props;

    const author = items[0].content.metadata.authors[0];

    return (
        <>
            <BlogListPageMetadata />
            <BlogLayout>
                <AuthorCardWithProps author={author} />
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6" />
                <h1 className="text-4xl">Posts</h1>
                <BlogPostItems
                    items={items}
                    showTitle={false}
                    isAuthorPage={true}
                />
            </BlogLayout>
        </>
    );
};

export default AuthorPage;
