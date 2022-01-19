import * as React from "react";
import { SVGProps } from "react";

const SvgChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="chevronDownIcon_svg__feather chevronDownIcon_svg__feather-chevron-down"
        {...props}
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export default SvgChevronDownIcon;
