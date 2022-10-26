import React, { useEffect, useState } from "react";
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

import { Tags } from "@site/src/components/blog";
import { Date, ReadingTime, Spacer } from "@site/src/components/blog/common";
import useScrollTracker from "@site/src/hooks/use-scroll-tracker";
import useLocalStorage from "@site/src/hooks/use-localstorage";
import NewsletterCta from "../../newsletter-cta";

export const BlogPostPageView = ({ children }) => {
    const { scrollY } = useScrollTracker([50]);
    const [canShowNewsletterWidget, setCanShowNewsletterWidget] =
        useLocalStorage("newsletter-popup-visible", true);

    const [showNewsletterWidget, setShowNewsletterWidget] = useState(false);

    useEffect(() => {
        if (canShowNewsletterWidget === true && scrollY >= 50) {
            setShowNewsletterWidget(true);
        }
    }, [scrollY]);

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
    } = metadata;

    const {
        siteConfig: { url },
    } = useDocusaurusContext();

    return (
        <BlogPostItemContainer className="blog-post-item-shadow rounded-[10px] p-4">
            <div className="relative">
                <div className="absolute top-0 right-0 rounded-bl-[10px] bg-white">
                    <div className="flex items-center px-2 py-1 space-x-2">
                        <TwitterShareButton
                            windowWidth={750}
                            windowHeight={800}
                            url={url + permalink}
                            className="flex"
                            title={title}
                            hashtags={tags.map((tag) => tag.label)}
                        >
                            <TwitterIcon size={36} round />
                        </TwitterShareButton>
                        <RedditShareButton
                            className="flex"
                            windowWidth={750}
                            windowHeight={600}
                            url={url + permalink}
                            title={title}
                        >
                            <RedditIcon size={36} round />
                        </RedditShareButton>
                        <LinkedinShareButton
                            url={url + permalink}
                            title={title}
                            source={url}
                            summary={description}
                            className="flex"
                        >
                            <LinkedinIcon size={36} round />
                        </LinkedinShareButton>
                    </div>
                </div>
                <img
                    className="mb-2 rounded-xl"
                    src={`https://refine-web.imgix.net${frontMatter.image}?w=800`}
                    alt="Post image"
                />
            </div>
            <div className="mb-8 text-sm text-[#525860]">
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
            <NewsletterCta
                visible={showNewsletterWidget}
                onCloseClick={() => {
                    setCanShowNewsletterWidget(true);
                    setShowNewsletterWidget(false);
                }}
            />
        </BlogPostItemContainer>
    );
};
