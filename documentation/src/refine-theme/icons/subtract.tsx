import React from "react";

export const SubtractIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        {...props}
    >
        <path
            fill="currentColor"
            d="M0 3a3 3 0 0 1 3-3h8a1 1 0 1 1 0 2H3a1 1 0 0 0-1 1v8a1 1 0 1 1-2 0V3Z"
        />
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm10 0H6v8h8V6Z"
            clipRule="evenodd"
        />
    </svg>
);
