import React from "react";

export const ChevronRight = (
    props: React.SVGProps<SVGSVGElement>,
): JSX.Element => (
    <svg
        width={16}
        height={24}
        viewBox="0 0 16 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M15.586 11.202.434.054A.277.277 0 0 0 .15.026a.263.263 0 0 0-.11.093.242.242 0 0 0-.04.135V2.7c0 .155.077.304.205.399l12.1 8.9-12.1 8.9a.492.492 0 0 0-.205.399v2.447c0 .212.259.33.434.2l15.152-11.148c.13-.095.233-.216.305-.354a.963.963 0 0 0 0-.888 1.028 1.028 0 0 0-.305-.354Z"
            fill="#fff"
        />
    </svg>
);
