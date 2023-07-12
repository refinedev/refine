import React from "react";

export const PricingCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={31}
        viewBox="0 0 30 31"
        fill="none"
        {...props}
    >
        <g filter="url(#pricing-check-icon-a)">
            <rect
                width={20}
                height={20}
                x={5}
                y={2}
                fill="url(#pricing-check-icon-b)"
                rx={10}
            />
            <path
                fill="currentColor"
                className="dark:text-gray-900 text-gray-0"
                fillRule="evenodd"
                d="M10.366 11.116a1.25 1.25 0 0 1 1.768 0l1.616 1.616 4.116-4.116a1.25 1.25 0 0 1 1.768 1.768l-5 5a1.25 1.25 0 0 1-1.768 0l-2.5-2.5a1.25 1.25 0 0 1 0-1.768Z"
                clipRule="evenodd"
            />
        </g>
        <defs>
            <linearGradient
                id="pricing-check-icon-b"
                x1={5.084}
                x2={25.084}
                y1={12}
                y2={12}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#0FBDBD" />
                <stop offset={1} stopColor="#26D97F" />
            </linearGradient>
            <filter
                id="pricing-check-icon-a"
                width={30}
                height={30}
                x={0}
                y={0.333}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feMorphology
                    in="SourceAlpha"
                    radius={1.667}
                    result="effect1_dropShadow_2400_21239"
                />
                <feOffset dy={3.333} />
                <feGaussianBlur stdDeviation={3.333} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0.14902 0 0 0 0 0.85098 0 0 0 0 0.498039 0 0 0 0.5 0" />
                <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_2400_21239"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_2400_21239"
                    result="shape"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy={3.333} />
                <feGaussianBlur stdDeviation={1.667} />
                <feComposite
                    in2="hardAlpha"
                    k2={-1}
                    k3={1}
                    operator="arithmetic"
                />
                <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                <feBlend in2="shape" result="effect2_innerShadow_2400_21239" />
            </filter>
        </defs>
    </svg>
);
