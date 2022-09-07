import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";

export const Tags = () => {
    const { metadata } = useBlogPost();

    return (
        <div className="font-montserrat">
            <span className="font-bold">Tags: </span>
            <div className="inline-flex flex-wrap gap-2">
                {metadata.tags.map((tag, index) => (
                    <Link
                        key={index}
                        to={tag.permalink}
                        className="no-underline"
                    >
                        <span className="bg-[#F6F6F9] px-2 py-1 capitalize text-sm rounded border border-solid border-[#2A2A42] text-[#2A2A42] hover:text-[#1890FF] hover:border-[#1890FF] transition duration-150">
                            {tag.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
