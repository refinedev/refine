import React from "react";
import { useBlogPost } from "@docusaurus/theme-common/internal";

export const Tags = () => {
    const { metadata } = useBlogPost();

    return (
        <div className="font-montserrat">
            <span className="font-bold">Tags: </span>
            <div className="inline-flex flex-wrap gap-2">
                {metadata.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-[#F6F6F9] px-2 capitalize text-sm rounded border border-solid border-[#2A2A42] text-[#2A2A42] cursor-default"
                    >
                        {tag.label}
                    </span>
                ))}
            </div>
        </div>
    );
};
