import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";

export const FeaturedBlogPostItem = () => {
    const { metadata } = useBlogPost();

    return (
        <BlogPostItemContainer>
            <div className="flex overflow-hidden rounded-lg blog-post-item-shadow">
                <Link itemProp="url" to={metadata.permalink}>
                    <div className="w-72 h-full relative">
                        <img
                            src={metadata.frontMatter.image}
                            alt="Post image"
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </Link>
                <div className="flex flex-col justify-between h-full p-5">
                    <div className="text-sm text-slate-600">
                        {metadata.formattedDate} ·{" "}
                        {Math.round(metadata.readingTime)} mins
                    </div>
                    <div className="mt-1 h-[200px]">
                        <Link
                            itemProp="url"
                            to={metadata.permalink}
                            className="hover:no-underline"
                        >
                            <div className="font-bold text-color-base hover:text-stone-600">
                                {metadata.title}
                            </div>
                        </Link>
                        <div className="mt-4">{metadata.description}</div>
                    </div>
                    <figcaption className="flex items-center space-x-4 mt-2">
                        <Link href={metadata.authors[0]?.url} itemProp="url">
                            <img
                                src={metadata.authors[0]?.imageURL}
                                alt={metadata.authors[0]?.name}
                                className="flex-none w-14 h-14 rounded-full object-cover"
                                loading="lazy"
                            />
                        </Link>
                        <div className="flex-auto">
                            <div className="text-base relative text-slate-900 font-semibold">
                                <Link
                                    href={metadata.authors[0]?.url}
                                    itemProp="url"
                                >
                                    <span className="absolute inset-0"></span>
                                    {metadata.authors[0]?.name}
                                </Link>
                            </div>
                            <div className="mt-0.5">
                                {metadata.authors[0]?.title}
                            </div>
                        </div>
                    </figcaption>
                </div>
            </div>
        </BlogPostItemContainer>
    );
};
