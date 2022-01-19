import * as React from "react";
import { SVGProps } from "react";

const SvgChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="chevronRightIcon_svg__feather chevronRightIcon_svg__feather-chevron-right"
        {...props}
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
);

export default SvgChevronRightIcon;
