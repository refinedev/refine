import * as React from "react";
import { SVGProps } from "react";

const SvgStrapi = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={48}
        height={48}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31.733 32.473V16.986a.999.999 0 0 0-1-1H15.265V0h31.44c.55 0 .998.447.998.999v31.474h-15.97Z"
            fill="#8E75FF"
        />
        <path
            opacity={0.405}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.264 0v15.987H.5a.5.5 0 0 1-.353-.853L15.264 0ZM31.733 47.254v-14.78h15.97L32.584 47.606a.5.5 0 0 1-.852-.353Z"
            fill="#8E75FF"
        />
        <path
            opacity={0.405}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.264 15.987h15.97a.5.5 0 0 1 .499.5v15.987h-15.47a.999.999 0 0 1-.999-.999V15.987Z"
            fill="#8E75FF"
        />
    </svg>
);

export default SvgStrapi;
