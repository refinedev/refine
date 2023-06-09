import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import { blogPostContainerID } from "@docusaurus/utils-common";
import MDXContent from "@theme/MDXContent";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
    LinkedinShareButton,
    RedditShareButton,
    TwitterShareButton,
    TwitterIcon,
    RedditIcon,
    LinkedinIcon,
} from "react-share";

import { Date, ReadingTime } from "@site/src/components/blog/common";
import clsx from "clsx";

export const BlogPostPageView = ({ children }) => {
    const { metadata, isBlogPostPage } = useBlogPost();
    const {
        permalink,
        title,
        date,
        formattedDate,
        readingTime,
        frontMatter,
        tags,
        description,
        authors,
    } = metadata;
    const author = authors[0];

    const {
        siteConfig: { url },
    } = useDocusaurusContext();

    // data-className="py-3 px-3 md:py-6 md:px-14"
    return (
        <BlogPostItemContainer
            className={clsx(
                "lg:max-w-[864px] lg:py-16", // lg:py-16
                "md:max-w-[656px] py-9", // py-10
                "max-w-[360px]",
                "w-full mx-auto",
            )}
        >
            <div
                className={clsx(
                    "flex",
                    "justify-between",
                    "items-center",
                    "md:px-6",
                )}
            >
                <Link
                    to="/blog"
                    className={clsx("text-gray-500 text-sm no-underline")}
                >
                    ← Back to blog
                </Link>
                <div className="flex items-center space-x-2 px-2 py-1">
                    <span className="text-gray-500 text-sm">Share on</span>
                    <TwitterShareButton
                        windowWidth={750}
                        windowHeight={800}
                        url={url + permalink}
                        className="flex"
                        title={title}
                        hashtags={tags.map((tag) => tag.label)}
                    >
                        <TwitterIcon size={26} round />
                    </TwitterShareButton>
                    <RedditShareButton
                        className="flex"
                        windowWidth={750}
                        windowHeight={600}
                        url={url + permalink}
                        title={title}
                    >
                        <RedditIcon size={26} round />
                    </RedditShareButton>
                    <LinkedinShareButton
                        url={url + permalink}
                        title={title}
                        source={url}
                        summary={description}
                        className="flex"
                    >
                        <LinkedinIcon size={26} round />
                    </LinkedinShareButton>
                </div>
            </div>
            <div>
                <img
                    className="mb-2 w-full rounded-xl"
                    src={`https://refine-web.imgix.net${frontMatter.image?.replace(
                        "https://refine.ams3.cdn.digitaloceanspaces.com",
                        "",
                    )}?w=800`}
                    alt={title}
                />
            </div>
            <div className="md:px-6">
                <div className="mb-6 text-sm">
                    <div
                        className={clsx(
                            "flex",
                            "justify-between",
                            "sm:flex-row flex-col",
                        )}
                    >
                        <div className="flex justify-center items-center gap-2">
                            <Link
                                to={`/blog/author/${author?.key}`}
                                itemProp="url"
                            >
                                <img
                                    src={author?.imageURL}
                                    alt={author?.name}
                                    loading="lazy"
                                    className="flex h-[32px] w-[32px] rounded-full object-cover"
                                />
                            </Link>
                            <Link
                                to={`/blog/author/${author?.key}`}
                                itemProp="url"
                                className={clsx(
                                    "flex-1",
                                    "text-gray-900 dark:text-gray-200",
                                    "text-sm",
                                    "no-underline",
                                    "hover:no-underline",
                                )}
                            >
                                {author?.name}
                            </Link>
                            <span className="w-[4px] h-[4px] rounded-full bg-gray-600 dark:bg-gray-500"></span>
                            <span className="text-gray-600 dark:text-gray-400">
                                {author?.title}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Date date={date} formattedDate={formattedDate} />
                            {typeof readingTime !== "undefined" && (
                                <>
                                    <span className="w-[4px] h-[4px] rounded-full bg-gray-600 dark:bg-gray-500"></span>
                                    <ReadingTime readingTime={readingTime} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <h1 className="text-xl md:text-4xl" itemProp="headline">
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
            </div>
        </BlogPostItemContainer>
    );
};
