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

const AuthorCard = ({ author }) => {
    const authorHasSocialInfo =
        author.github || author.twitter || author.linkedin;

    return (
        <div className={clsx("flex", "justify-between", "items-center")}>
            <div className="flex items-center">
                <Link to={`/blog/author/${author?.key}`} itemProp="url">
                    <img
                        src={author?.imageURL}
                        alt={author?.name}
                        loading="lazy"
                        className="flex h-[120px] w-[120px] rounded-full object-cover"
                    />
                </Link>
                <div className="ml-3">
                    <h1 className="m-0 p-0 leading-0">{author?.name}</h1>
                    <div className="text-gray-600">{author?.title}</div>
                </div>
            </div>

            {authorHasSocialInfo && (
                <div className="flex justify-center gap-3">
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
    );
};
