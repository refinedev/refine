import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";

import { Date, ReadingTime, Spacer } from "@site/src/components/blog/common";

export const FeaturedBlogPostItem = () => {
    const { metadata } = useBlogPost();
    const {
        permalink,
        title,
        date,
        formattedDate,
        readingTime,
        frontMatter,
        description,
    } = metadata;

    const author = metadata.authors[0];

    return (
        <BlogPostItemContainer>
            <div className="blog-post-item-shadow flex h-full flex-col overflow-hidden rounded-[10px] lg:h-[210px] lg:flex-row">
                <Link itemProp="url" to={permalink}>
                    <div className="relative h-40 w-full hover:brightness-90 lg:h-full lg:w-44">
                        <img
                            src={`https://refine-web.imgix.net${(
                                frontMatter.featured_image ?? frontMatter.image
                            ).replace(
                                "https://refine.ams3.cdn.digitaloceanspaces.com",
                                "",
                            )}?w=500`}
                            alt="Post image"
                            className="absolute inset-0 h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover transition duration-150 lg:rounded-tr-none lg:rounded-bl-[10px]"
                            loading="lazy"
                        />
                    </div>
                </Link>
                <div className="flex h-full flex-col justify-between gap-3 p-3 lg:gap-0">
                    <div>
                        <div className="text-[10px] font-medium text-[#9696B4]">
                            <Date date={date} formattedDate={formattedDate} />
                            {typeof readingTime !== "undefined" && (
                                <>
                                    <Spacer />
                                    <ReadingTime readingTime={readingTime} />
                                </>
                            )}
                        </div>
                        <div className="mt-1">
                            <Link
                                itemProp="url"
                                to={permalink}
                                className="hover:no-underline"
                            >
                                <div className="text-color-base text-base font-bold transition duration-150 hover:text-stone-600">
                                    {title}
                                </div>
                            </Link>
                            <div className="text-color-base line-clamp-3 mt-4 text-xs">
                                {description}
                            </div>
                        </div>
                    </div>
                    <figcaption className="flex items-center space-x-4">
                        <Link to={`/blog/author/${author?.key}`} itemProp="url">
                            <img
                                src={author?.imageURL}
                                alt={author?.name}
                                className="flex h-12 w-12 rounded-full object-cover"
                                loading="lazy"
                            />
                        </Link>
                        <div className="flex-auto">
                            <Link
                                to={`/blog/author/${author?.key}`}
                                itemProp="url"
                                className="text-color-base text-xs font-bold"
                            >
                                {author?.name}
                            </Link>
                            <div className="-mt-0.5 text-[10px] font-medium text-[#9696B4]">
                                {author?.title}
                            </div>
                        </div>
                    </figcaption>
                </div>
            </div>
        </BlogPostItemContainer>
    );
};
