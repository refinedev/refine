import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";

import { Date, ReadingTime, Spacer } from "@site/src/components/blog/common";

export default function BlogPostItem({ className }) {
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
        <BlogPostItemContainer className={className}>
            <div className="blog-post-item-shadow flex h-full flex-col overflow-hidden rounded-[10px]">
                <Link itemProp="url" to={permalink}>
                    <div className="relative m-0 h-40 overflow-hidden pt-[56.25%] hover:brightness-90">
                        <img
                            src={`https://refine-web.imgix.net${frontMatter.image?.replace(
                                "https://refine.ams3.cdn.digitaloceanspaces.com",
                                "",
                            )}?w=500`}
                            alt="Post image"
                            className="absolute inset-0 h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover transition duration-150"
                            loading="lazy"
                        />
                    </div>
                </Link>
                <div className="flex h-full flex-col justify-between gap-3 p-3">
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
                                rel="noopener dofollow"
                            >
                                <div className="text-color-base text-base font-bold transition duration-150 hover:text-stone-600">
                                    {title}
                                </div>
                            </Link>
                            <div className="text-color-base line-clamp-3 mt-1 text-xs">
                                {description}
                            </div>
                        </div>
                    </div>
                    <figcaption className="flex items-center space-x-4">
                        <Link
                            href={`/blog/author/${author?.key}`}
                            itemProp="url"
                        >
                            <img
                                src={author?.imageURL}
                                alt={author?.name}
                                className="flex h-12 w-12 rounded-full object-cover"
                                loading="lazy"
                            />
                        </Link>
                        <div className="flex-auto">
                            <Link
                                href={`/blog/author/${author?.key}`}
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
}
