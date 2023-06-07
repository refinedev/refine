import React from "react";

export const HamburgerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M4 10C4 9.44772 4.44771 9 5 9H27C27.5523 9 28 9.44772 28 10C28 10.5523 27.5523 11 27 11H5C4.44771 11 4 10.5523 4 10Z"
            fill="white"
        />
        <path
            d="M4 16C4 15.4477 4.44771 15 5 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H5C4.44771 17 4 16.5523 4 16Z"
            fill="white"
        />
        <path
            d="M5 21C4.44771 21 4 21.4477 4 22C4 22.5523 4.44771 23 5 23H27C27.5523 23 28 22.5523 28 22C28 21.4477 27.5523 21 27 21H5Z"
            fill="white"
        />
    </svg>
);
