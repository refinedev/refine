import React from "react";

export const CancelIcon = (
    props: React.SVGProps<SVGSVGElement>,
): JSX.Element => (
    <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.44 7.425a1.5 1.5 0 1 0 2.12 2.121l1.94-1.94L6.803 9.91a1.5 1.5 0 0 0 2.122-2.121L6.62 5.485l2.304-2.303a1.5 1.5 0 1 0-2.122-2.121L4.5 3.364l-1.94-1.94A1.5 1.5 0 1 0 .44 3.547l1.939 1.94-1.94 1.939Z"
            fill="currentColor"
        />
    </svg>
);
