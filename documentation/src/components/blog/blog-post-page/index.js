import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import { blogPostContainerID } from "@docusaurus/utils-common";
import MDXContent from "@theme/MDXContent";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";

import { Tags } from "@site/src/components/blog";
import { Date, ReadingTime, Spacer } from "@site/src/components/blog/common";

export const BlogPostPageView = ({ children }) => {
    const { metadata, isBlogPostPage } = useBlogPost();
    const { permalink, title, date, formattedDate, readingTime, frontMatter } =
        metadata;

    return (
        <BlogPostItemContainer className="blog-post-item-shadow rounded-[10px] p-4">
            <img
                className="rounded-xl mb-2"
                src={frontMatter.image}
                alt="Post image"
            />
            <div className="mb-2 text-sm text-[#525860]">
                <Date date={date} formattedDate={formattedDate} />
                {typeof readingTime !== "undefined" && (
                    <>
                        <Spacer />
                        <ReadingTime readingTime={readingTime} />
                    </>
                )}
            </div>
            <h1 className="text-[2rem] md:text-5xl" itemProp="headline">
                {isBlogPostPage ? (
                    title
                ) : (
                    <Link itemProp="url" to={permalink}>
                        {title}
                    </Link>
                )}
            </h1>
            <div
                id={blogPostContainerID}
                className="markdown"
                itemProp="articleBody"
            >
                <MDXContent>{children}</MDXContent>
                <br />
                <Tags />
            </div>
        </BlogPostItemContainer>
    );
};
