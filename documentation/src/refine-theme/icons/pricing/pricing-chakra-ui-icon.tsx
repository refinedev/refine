import * as React from "react";
import type { SVGProps } from "react";
const SvgPricingChakraUiIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {props.name && <title>{props.name}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0Z"
            fill="url(#paint0_linear_2460_26842)"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.6762 4.38899L6.49645 12.5125C6.37817 12.63 6.46136 12.8318 6.62806 12.8318H12.1948C12.3473 12.8318 12.4355 13.0047 12.346 13.1282L7.98159 19.149C7.84887 19.332 8.09493 19.5494 8.26024 19.3952L17.48 10.7905C17.6039 10.6748 17.5221 10.4672 17.3526 10.4672H12.0913C11.9495 10.4672 11.8594 10.3153 11.9274 10.1909L14.9718 4.61097C15.075 4.42191 14.829 4.23723 14.6762 4.38899Z"
            fill="white"
        />
        <defs>
            <linearGradient
                id="paint0_linear_2460_26842"
                x1={12}
                y1={0}
                x2={12}
                y2={24}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#7BCBD4" />
                <stop offset={1} stopColor="#29C6B7" />
            </linearGradient>
        </defs>
    </svg>
);
export default SvgPricingChakraUiIcon;
