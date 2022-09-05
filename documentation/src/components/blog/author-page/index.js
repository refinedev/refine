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
            <BlogLayout
                sidebar={
                    <div className="w-full lg:w-1/4 mb-6">
                        <AuthorCardWithProps
                            author={author}
                            className="sticky-author-card"
                        />
                    </div>
                }
            >
                <BlogPostItems items={items} showTitle={false} />
            </BlogLayout>
        </>
    );
};

export default AuthorPage;
