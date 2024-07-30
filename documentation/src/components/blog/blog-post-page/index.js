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
  RedditIcon,
  LinkedinIcon,
} from "react-share";
import clsx from "clsx";

import { Date, ReadingTime } from "@site/src/components/blog/common";
import { BannerRandom } from "@site/src/components/banner/banner-random";

import { ChevronLeft, Twitter } from "../icons";

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

  return (
    <BlogPostItemContainer
      className={clsx(
        "pb-10",
        "pt-4 blog-lg:pt-8",
        "ml-auto",
        "w-full",
        "blog-lg:max-w-[894px]",
        "px-2 blog-md:px-8 blog-lg:px-0",
      )}
    >
      <div
        className={clsx(
          "hidden blog-md:flex",
          "justify-between",
          "items-center",
          "blog-sm:px-6",
          "pb-6 blog-lg:pb-10",
          "not-prose",
        )}
      >
        <Link
          to="/blog"
          className={clsx(
            "text-refine-react-5 dark:text-refine-react-4",
            "text-sm no-underline",
            "flex",
            "items-center",
            "gap-2",
          )}
        >
          <ChevronLeft /> Back to blog
        </Link>
        <div className="flex items-center gap-3 px-2 py-1 not-prose">
          <span className="text-refine-react-5 dark:text-refine-react-4 text-sm">
            Share on
          </span>
          <TwitterShareButton
            windowWidth={750}
            windowHeight={800}
            url={url + permalink}
            className="flex"
            title={title}
            hashtags={tags.map((tag) => tag.label)}
          >
            <Twitter width={24} height={24} />
          </TwitterShareButton>
          <RedditShareButton
            className="flex"
            windowWidth={750}
            windowHeight={600}
            url={url + permalink}
            title={title}
          >
            <RedditIcon size={24} round />
          </RedditShareButton>
          <LinkedinShareButton
            url={url + permalink}
            title={title}
            source={url}
            summary={description}
            className="flex"
          >
            <LinkedinIcon size={24} round />
          </LinkedinShareButton>
        </div>
      </div>
      <div className="not-prose">
        <img
          className="w-full rounded-xl blog-lg:rounded-[2.25rem] aspect-[894/504]"
          src={`https://refine-web.imgix.net${frontMatter.image?.replace(
            "https://refine.ams3.cdn.digitaloceanspaces.com",
            "",
          )}?w=1788`}
          alt={title}
        />
      </div>
      <div className="blog-sm:px-6">
        <div className="mt-6 blog-lg:mt-10 mb-6 text-sm">
          <div
            className={clsx(
              "flex items-center gap-2 text-refine-reac-5 dark:text-refine-react-4 not-prose",
              "ml-4 blog-md:ml-0",
            )}
          >
            <Date date={date} formattedDate={formattedDate} />
            {typeof readingTime !== "undefined" && (
              <>
                <span className="w-[4px] h-[4px] rounded-full bg-refine-reac-5 dark:bg-refine-react-4 " />
                <ReadingTime readingTime={readingTime} />
              </>
            )}
          </div>
          <div className="mx-6 mt-6 blog-lg:mt-10 mb-12">
            <BannerRandom />
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
