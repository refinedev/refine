import * as React from "react";
import { SVGProps } from "react";

export const MagnifierIcon = (props: SVGProps<SVGSVGElement>) => (
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
            fillRule="evenodd"
            d="M10.775 12.896a7 7 0 1 1 2.121-2.121l2.665 2.664a1.5 1.5 0 0 1-2.122 2.122l-2.664-2.665ZM11 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
            clipRule="evenodd"
        />
    </svg>
);
