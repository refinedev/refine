import * as React from "react";
import { SVGProps } from "react";

const HamburgerIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={14}
        viewBox="0 0 24 14"
        fill="none"
        {...props}
    >
        <path
            fill="currentColor"
            d="M0 1a1 1 0 0 1 1-1h22a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1ZM0 7a1 1 0 0 1 1-1h22a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1ZM1 12a1 1 0 1 0 0 2h22a1 1 0 1 0 0-2H1Z"
        />
    </svg>
);
export default HamburgerIcon;
