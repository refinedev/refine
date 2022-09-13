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
                        <span className="rounded border border-solid border-[#2A2A42] bg-[#F6F6F9] px-2 py-1 text-[10px] capitalize text-[#2A2A42] transition duration-150 hover:border-[#1890FF] hover:text-[#1890FF]">
                            {tag.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
