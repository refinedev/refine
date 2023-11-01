import * as React from "react";
import { SVGProps } from "react";

const ShadCn = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
        {...props}
    >
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m20 12-7.5 7.5M18.5 3.75 4.25 18"
        />
    </svg>
);

export default ShadCn;
