import React from "react";

export const ArrowIcon = (
    props: React.SVGProps<SVGSVGElement>,
): JSX.Element => (
    <svg
        width={27}
        height={24}
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M21.264 11.124c1.333.77 1.333 2.695 0 3.464l-18 10.393c-1.334.77-3-.193-3-1.732V2.464c0-1.54 1.666-2.502 3-1.732l18 10.392Z"
            fill="#fff"
        />
    </svg>
);
