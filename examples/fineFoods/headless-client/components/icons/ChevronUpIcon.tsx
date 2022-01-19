import * as React from "react";
import { SVGProps } from "react";

const SvgChevronUpIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="chevronUpIcon_svg__feather chevronUpIcon_svg__feather-chevron-up"
        {...props}
    >
        <path d="m18 15-6-6-6 6" />
    </svg>
);

export default SvgChevronUpIcon;
