import * as React from "react";
import type { SVGProps } from "react";
const SvgPricingElasticsearchIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {props.name && <title>{props.name}</title>}
        <g clipPath="url(#clip0_2460_26758)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.75 12.001C0.75 13.039 0.8955 14.0402 1.143 15.001H15.75C17.4068 15.001 18.75 13.6577 18.75 12.001C18.75 10.3435 17.4068 9.00098 15.75 9.00098H1.143C0.8955 9.96098 0.75 10.963 0.75 12.001Z"
                fill="#343741"
            />
            <path
                className="text-[#343741] dark:text-gray-0"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.75 12.001C0.75 13.039 0.8955 14.0402 1.143 15.001H15.75C17.4068 15.001 18.75 13.6577 18.75 12.001C18.75 10.3435 17.4068 9.00098 15.75 9.00098H1.143C0.8955 9.96098 0.75 10.963 0.75 12.001Z"
                fill="currentColor"
            />
            <mask
                id="mask0_2460_26758"
                style={{
                    maskType: "luminance",
                }}
                maskUnits="userSpaceOnUse"
                x={1}
                y={0}
                width={22}
                height={7}
            >
                <path d="M1.9834 0H22.1098V6.75H1.9834V0Z" fill="#FEC514" />
            </mask>
            <g mask="url(#mask0_2460_26758)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.9434 5.74575C21.3626 5.3595 21.7526 4.94475 22.1104 4.5C19.9106 1.75875 16.5379 0 12.7504 0C8.00965 0 3.92965 2.75775 1.9834 6.75H18.3836C19.3331 6.75 20.2459 6.38925 20.9434 5.74575Z"
                    fill="#FEC514"
                />
            </g>
            <mask
                id="mask1_2460_26758"
                style={{
                    maskType: "luminance",
                }}
                maskUnits="userSpaceOnUse"
                x={1}
                y={17}
                width={22}
                height={7}
            >
                <path
                    d="M1.98389 17.25H22.1104V23.9997H1.98389V17.25Z"
                    fill="#00BFB3"
                />
            </mask>
            <g mask="url(#mask1_2460_26758)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.3836 17.25H1.9834C3.9304 21.2415 8.00965 24 12.7504 24C16.5379 24 19.9106 22.2405 22.1104 19.5C21.7526 19.0545 21.3626 18.6398 20.9434 18.2535C20.2459 17.6093 19.3331 17.25 18.3836 17.25Z"
                    fill="#00BFB3"
                />
            </g>
        </g>
        <defs>
            <clipPath id="clip0_2460_26758">
                <rect width={24} height={24} fill="white" />
            </clipPath>
        </defs>
    </svg>
);
export default SvgPricingElasticsearchIcon;
