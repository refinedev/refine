import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";

import { Github, Twitter, Linkedin } from "../icons";

export const AuthorCardWithHook = ({ className }) => {
    const { metadata } = useBlogPost();

    const author = metadata.authors[0];

    return <AuthorCard author={author} className={className} />;
};

export const AuthorCardWithProps = ({ author, className }) => {
    return <AuthorCard author={author} className={className} />;
};

const AuthorCard = ({ author, className }) => {
    const authorHasSocialInfo =
        author.github || author.twitter || author.linkedin;

    return (
        <div
            className={clsx(
                "blog-post-item-shadow rounded-[10px] p-4",
                className,
            )}
        >
            <figcaption className="flex flex-col items-center">
                <Link to={`/blog/author/${author?.key}`} itemProp="url">
                    <img
                        src={author?.imageURL}
                        alt={author?.name}
                        loading="lazy"
                        className="flex h-[120px] w-[120px] rounded-full object-cover"
                    />
                </Link>
                <div className="mt-2 text-center">
                    <Link
                        to={`/blog/author/${author.key}`}
                        itemProp="url"
                        className="text-sm font-semibold text-inherit"
                    >
                        {author?.name}
                    </Link>
                    <div className="-mt-0.5 text-xs text-[#9696B4] ">
                        {author?.title}
                    </div>

                    {author?.description && (
                        <div className="mt-4 text-[10px] font-medium text-[#9696B4]">
                            {author?.description}
                        </div>
                    )}

                    {authorHasSocialInfo && (
                        <div className="mt-4 flex justify-center gap-3">
                            {author?.github && (
                                <Link to={author?.github}>
                                    <Github className="h-6 w-6" />
                                </Link>
                            )}
                            {author?.twitter && (
                                <Link to={author?.twitter}>
                                    <Twitter className="h-6 w-6" />
                                </Link>
                            )}
                            {author?.linkedin && (
                                <Link to={author?.linkedin}>
                                    <Linkedin className="h-6 w-6" />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </figcaption>
        </div>
    );
};
