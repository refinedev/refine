import React from "react";

export const SelectorButtonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={42}
        height={42}
        viewBox="0 0 42 42"
        fill="none"
        {...props}
    >
        <g clipPath="url(#selector-button-a)">
            <path
                fill="#1D1E30"
                fillRule="evenodd"
                d="M16.304 1.109a10.5 10.5 0 0 1 9.392 0l10.5 5.25A10.5 10.5 0 0 1 42 15.75v10.5a10.5 10.5 0 0 1-5.804 9.392l-10.5 5.25a10.5 10.5 0 0 1-9.392 0l-10.5-5.25A10.5 10.5 0 0 1 0 26.25v-10.5a10.5 10.5 0 0 1 5.804-9.391l10.5-5.25Z"
                clipRule="evenodd"
            />
            <path
                fill="url(#selector-button-b)"
                fillRule="evenodd"
                d="M16.528 2.056a10 10 0 0 1 8.944 0l10 5A10 10 0 0 1 41 16v10a10 10 0 0 1-5.528 8.944l-10 5a10 10 0 0 1-8.944 0l-10-5A10 10 0 0 1 1 26V16a10 10 0 0 1 5.528-8.944l10-5Zm.447.894a9 9 0 0 1 8.05 0l10 5A9 9 0 0 1 40 16v10a9 9 0 0 1-4.975 8.05l-10 5a9 9 0 0 1-8.05 0l-10-5A9 9 0 0 1 2 26V16a9 9 0 0 1 4.975-8.05l10-5Z"
                clipRule="evenodd"
            />
            <path
                fill="url(#selector-button-c)"
                fillRule="evenodd"
                d="M16.975 2.95a9 9 0 0 1 8.05 0l10 5A9 9 0 0 1 40 16v10a9 9 0 0 1-4.975 8.05l-10 5a9 9 0 0 1-8.05 0l-10-5A9 9 0 0 1 2 26V16a9 9 0 0 1 4.975-8.05l10-5Z"
                clipRule="evenodd"
            />
            <path
                stroke="url(#selector-button-d)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M32 21c0 6.075-4.925 11-11 11m11-11c0-6.075-4.925-11-11-11m11 11h-4.4M21 32c-6.075 0-11-4.925-11-11m11 11v-4.4M10 21c0-6.075 4.925-11 11-11M10 21h4.4M21 10v4.4"
            />
        </g>
        <defs>
            <radialGradient
                id="selector-button-c"
                cx={0}
                cy={0}
                r={1}
                gradientTransform="matrix(0 40 -40 0 21 1)"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#47EBEB" stopOpacity={0} />
                <stop offset={0.5} stopColor="#47EBEB" stopOpacity={0.25} />
                <stop offset={1} stopColor="#47EBEB" stopOpacity={0.5} />
            </radialGradient>
            <linearGradient
                id="selector-button-b"
                x1={21}
                x2={21}
                y1={1}
                y2={41}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#47EBEB" />
                <stop offset={0.5} stopColor="#47EBEB" stopOpacity={0.5} />
                <stop offset={1} stopColor="#47EBEB" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient
                id="selector-button-d"
                x1={21}
                y1={1}
                x2={21}
                y2={41}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#47EBEB" />
                <stop offset={0.5} stopColor="#47EBEB" stopOpacity={0.75} />
                <stop offset={1} stopColor="#47EBEB" stopOpacity={0.5} />
            </linearGradient>
            <clipPath id="selector-button-a">
                <path fill="#fff" d="M0 0h42v42H0z" />
            </clipPath>
        </defs>
    </svg>
);
