import * as React from "react";
import { SVGProps } from "react";

const SvgClose = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="close_svg__feather close_svg__feather-x"
        {...props}
    >
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
);

export default SvgClose;
