import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import { usePluralForm } from "@docusaurus/theme-common";
import { blogPostContainerID } from "@docusaurus/utils-common";
import { translate } from "@docusaurus/Translate";
import MDXContent from "@theme/MDXContent";

import BlogPostItemContainer from "@theme/BlogPostItem/Container";

function useReadingTimePlural() {
    const { selectMessage } = usePluralForm();
    return (readingTimeFloat) => {
        const readingTime = Math.ceil(readingTimeFloat);
        return selectMessage(
            readingTime,
            translate(
                {
                    id: "theme.blog.post.readingTime.plurals",
                    description:
                        'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
                    message: "One min read|{readingTime} min read",
                },
                { readingTime },
            ),
        );
    };
}

function ReadingTime({ readingTime }) {
    const readingTimePlural = useReadingTimePlural();
    return <>{readingTimePlural(readingTime)}</>;
}

function Date({ date, formattedDate }) {
    return (
        <time dateTime={date} itemProp="datePublished">
            {formattedDate}
        </time>
    );
}

function Spacer() {
    return <>{" · "}</>;
}

export const BlogPostPageView = ({ children }) => {
    const { metadata, isBlogPostPage } = useBlogPost();
    const { permalink, title, date, formattedDate, readingTime, frontMatter } =
        metadata;

    return (
        <BlogPostItemContainer>
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
            </div>
        </BlogPostItemContainer>
    );
};
