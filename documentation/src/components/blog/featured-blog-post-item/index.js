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
            <div className="flex flex-col lg:flex-row overflow-hidden rounded-[10px] blog-post-item-shadow h-full lg:h-[260px] xl:h-[240px]">
                <Link itemProp="url" to={permalink}>
                    <div className="relative lg:h-full w-full h-40 lg:w-44 ">
                        <img
                            src={
                                frontMatter.featured_image ?? frontMatter.image
                            }
                            alt="Post image"
                            className="absolute inset-0 w-full h-full object-cover hover:brightness-90 transition duration-150"
                            loading="lazy"
                        />
                    </div>
                </Link>
                <div className="flex flex-col justify-between p-3 h-full gap-3 lg:gap-0">
                    <div>
                        <div className="text-xs text-[#525860]">
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
                                <div className="font-bold text-color-base hover:text-stone-600 transition duration-150">
                                    {title}
                                </div>
                            </Link>
                            <div className="mt-1 text-color-base text-sm line-clamp-3">
                                {description}
                            </div>
                        </div>
                    </div>
                    <figcaption className="flex items-center space-x-4">
                        <Link to={`/blog/author/${author?.key}`} itemProp="url">
                            <img
                                src={author?.imageURL}
                                alt={author?.name}
                                className="flex w-12 h-12 rounded-full object-cover"
                                loading="lazy"
                            />
                        </Link>
                        <div className="flex-auto">
                            <Link
                                to={`/blog/author/${author?.key}`}
                                itemProp="url"
                                className="text-sm text-color-base font-semibold"
                            >
                                {author?.name}
                            </Link>
                            <div className="text-xs text-[#525860] -mt-0.5">
                                {author?.title}
                            </div>
                        </div>
                    </figcaption>
                </div>
            </div>
        </BlogPostItemContainer>
    );
};
