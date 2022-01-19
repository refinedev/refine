import * as React from "react";
import { SVGProps } from "react";

const SvgChevronLeftIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="chevronLeftIcon_svg__feather chevronLeftIcon_svg__feather-chevron-left"
        {...props}
    >
        <path d="m15 18-6-6 6-6" />
    </svg>
);

export default SvgChevronLeftIcon;
