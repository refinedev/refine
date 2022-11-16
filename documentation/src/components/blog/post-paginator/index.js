import React from "react";
import Link from "@docusaurus/Link";

import { Date, ReadingTime, Spacer } from "@site/src/components/blog/common";

export const PostPaginator = ({ posts, title }) => {
    if (posts.length < 1) {
        return null;
    }

    return (
        <div className="blog-post-item-shadow rounded-[10px] p-4">
            <h2 className="font-montserrat mb-4 text-[24px] font-extrabold uppercase">
                {title}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        to={post.permalink}
                        rel="dofollow"
                        className="blog-paginator-item font-montserrat flex min-h-[150px] flex-col justify-between gap-4 rounded-2xl bg-[#f6f6f9] p-4 no-underline transition duration-150 ease-in-out"
                    >
                        <figcaption className="flex items-center justify-center space-x-2">
                            <Link
                                to={`/blog/author/${post.authors[0]?.key}`}
                                itemProp="url"
                                className="self-end flex-shrink-0"
                            >
                                <img
                                    src={post.authors[0]?.imageURL}
                                    alt={post.authors[0]?.name}
                                    className="flex h-8 w-8 rounded-full object-cover"
                                    loading="lazy"
                                />
                            </Link>
                            <div>
                                <Link
                                    to={`/blog/author/${post.authors[0]?.key}`}
                                    itemProp="url"
                                    id="author-name"
                                    className="text-color-base text-sm font-semibold whitespace-nowrap"
                                >
                                    {post.authors[0]?.name}
                                </Link>
                                <div
                                    id="author-title"
                                    className="-mt-1.5 text-[10px] text-[#9696B4] transition duration-150 ease-in-out"
                                >
                                    {post.authors[0]?.title}
                                </div>
                            </div>
                        </figcaption>
                        <div
                            id="post-title"
                            className="text-center font-bold text-[#2A2A42]"
                        >
                            {post.title}
                        </div>
                        <div
                            id="post-info"
                            className="mb-2 text-center text-[10px] font-medium text-[#9696B4] transition duration-150 ease-in-out"
                        >
                            <Date
                                date={post.date}
                                formattedDate={post.formattedDate}
                            />
                            {typeof post.readingTime !== "undefined" && (
                                <>
                                    <Spacer />
                                    <ReadingTime
                                        readingTime={post.readingTime}
                                    />
                                </>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
