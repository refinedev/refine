import React from "react";

export const PricingTimesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        {...props}
    >
        <rect
            width={20}
            height={20}
            fill="currentColor"
            className="text-gray-200 dark:text-gray-500"
            rx={10}
        />
        <g filter="url(#pricing-times-icon-a)">
            <path
                fill="currentColor"
                className="text-gray-500 dark:text-gray-700"
                fillRule="evenodd"
                d="M8.384 6.616a1.25 1.25 0 1 0-1.768 1.768L8.232 10l-1.616 1.616a1.25 1.25 0 0 0 1.768 1.768L10 11.768l1.616 1.616a1.25 1.25 0 0 0 1.768-1.768L11.768 10l1.616-1.616a1.25 1.25 0 0 0-1.768-1.768L10 8.232 8.384 6.616Z"
                clipRule="evenodd"
            />
        </g>
        <defs>
            <filter
                id="pricing-times-icon-a"
                width={7.5}
                height={8.125}
                x={6.25}
                y={6.25}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy={0.625} />
                <feGaussianBlur stdDeviation={0.625} />
                <feComposite
                    in2="hardAlpha"
                    k2={-1}
                    k3={1}
                    operator="arithmetic"
                />
                <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
                <feBlend in2="shape" result="effect1_innerShadow_2400_21260" />
            </filter>
        </defs>
    </svg>
);
