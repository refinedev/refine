import React from "react";

export const TwoTonedCloudIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g filter="url(#filter0_i_736_18971)">
            <path
                d="M18 11C18 11.3882 17.9558 11.766 17.8721 12.1287C19.1036 12.5023 20 13.6464 20 15C20 16.6569 18.6569 18 17 18H8C5.79086 18 4 16.2092 4 14C4 11.7908 5.79086 10 8 10C8.03336 10 8.06659 10.0004 8.09976 10.0012C8.56256 7.71838 10.5806 6 13 6C15.7614 6 18 8.23859 18 11Z"
                fill="url(#paint0_linear_736_18971)"
            />
        </g>
        <defs>
            <filter
                id="filter0_i_736_18971"
                x="4"
                y="6"
                width="16"
                height="12"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="1" />
                <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0.5 0 0 0 0 1 0 0 0 0.5 0"
                />
                <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_736_18971"
                />
            </filter>
            <linearGradient
                id="paint0_linear_736_18971"
                x1="12"
                y1="6"
                x2="12"
                y2="18"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#0080FF" stopOpacity="0.15" />
                <stop offset="1" stopColor="#0080FF" stopOpacity="0.4" />
            </linearGradient>
        </defs>
    </svg>
);
