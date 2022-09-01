import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";

export default function BlogPostItem({ className }) {
    const { metadata } = useBlogPost();

    return (
        <BlogPostItemContainer className={className}>
            <div className="flex flex-col overflow-hidden rounded-lg blog-post-item-shadow h-full">
                <Link itemProp="url" to={metadata.permalink}>
                    <div className="h-48 relative">
                        <img
                            src={metadata.frontMatter.image}
                            alt="Post image"
                            className="absolute inset-0 w-full h-full object-cover hover:brightness-90 transition-all"
                            loading="lazy"
                        />
                    </div>
                </Link>
                <div className="flex flex-col justify-between min-h-[300px] sm:min-h-[375px] h-full p-5">
                    <div>
                        <div className="text-sm text-slate-600">
                            {metadata.formattedDate} ·{" "}
                            {Math.round(metadata.readingTime)} mins
                        </div>
                        <div className="mt-1">
                            <Link
                                itemProp="url"
                                to={metadata.permalink}
                                className="hover:no-underline"
                            >
                                <div className="font-bold text-color-base hover:text-stone-600 transition-all">
                                    {metadata.title}
                                </div>
                            </Link>
                            <div className="mt-4">{metadata.description}</div>
                        </div>
                    </div>
                    <figcaption className="flex items-center space-x-4 mt-2">
                        <Link href={metadata.authors[0]?.url} itemProp="url">
                            <img
                                src={metadata.authors[0]?.imageURL}
                                alt={metadata.authors[0]?.name}
                                className="flex w-12 h-12 rounded-full object-cover"
                                loading="lazy"
                            />
                        </Link>
                        <div className="flex-auto">
                            <Link
                                href={metadata.authors[0]?.url}
                                itemProp="url"
                                className="text-sm text-color-base font-semibold"
                            >
                                {metadata.authors[0]?.name}
                            </Link>
                            <div className="text-xs text-slate-600 -mt-0.5">
                                {metadata.authors[0]?.title}
                            </div>
                        </div>
                    </figcaption>
                </div>
            </div>
        </BlogPostItemContainer>
    );
}
