import * as React from "react";
import type { SVGProps } from "react";
const SvgPricingSheetsIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {props.name && <title>{props.name}</title>}
        <rect width={24} height={24} rx={4} fill="#00AC47" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 6V18H20V6H4ZM18 16V13H13V16H18ZM11 16V13H6V16H11ZM18 8V11H13V8H18ZM11 8H6V11H11V8Z"
            fill="white"
        />
    </svg>
);
export default SvgPricingSheetsIcon;
