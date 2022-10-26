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
                    <div className="flex items-center space-x-2 py-1 px-2">
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
            {showNewsletterWidget && (
                <aside className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-lg px-5 py-3 ">
                    <section className="bg-gray-50">
                        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                            <div className="mx-auto max-w-lg text-center">
                                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                    This is your weekly frontend update
                                </h2>

                                <p className="hidden text-gray-500 sm:mt-4 sm:block">
                                    Stay up to date with the latest news, guides
                                    & tips from our team of experts!{" "}
                                    <b>No Spam!</b>
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setCanShowNewsletterWidget(true);
                                    setShowNewsletterWidget(false);
                                }}
                            >
                                close
                            </button>

                            <div className="mx-auto mt-8 max-w-xl">
                                <form action="#" className="sm:flex sm:gap-4">
                                    <div className="sm:flex-1">
                                        <label
                                            htmlFor="email"
                                            className="sr-only"
                                        >
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            className="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="group mt-4 flex w-full items-center justify-center rounded-md bg-rose-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
                                    >
                                        <span className="text-sm font-medium">
                                            {" "}
                                            Sign Up{" "}
                                        </span>

                                        <svg
                                            className="ml-3 h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </aside>
            )}
        </BlogPostItemContainer>
    );
};
