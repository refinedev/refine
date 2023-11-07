import React from "react";

export const LandingHeroBeamSvg = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={128}
        height={256}
        viewBox="0 0 128 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <mask
            id="mask0_1493_965"
            style={{
                maskType: "alpha",
            }}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={128}
            height={256}
        >
            <rect
                width={128}
                height={256}
                fill="url(#paint0_linear_1493_965)"
            />
        </mask>
        <g mask="url(#mask0_1493_965)">
            <path
                d="M64 0V256"
                stroke="url(#paint1_linear_1493_965)"
                strokeWidth={40}
            />
            <path
                d="M64 0V256"
                stroke="url(#paint2_radial_1493_965)"
                strokeWidth={40}
            />
            <path d="M64 0V256" stroke="#47EBEB" />
        </g>
        <defs>
            <linearGradient
                id="paint0_linear_1493_965"
                x1={64}
                y1={0}
                x2={64}
                y2={256}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#D9D9D9" stopOpacity={0} />
                <stop offset={0.225598} stopColor="#D9D9D9" />
            </linearGradient>
            <linearGradient
                id="paint1_linear_1493_965"
                x1={44}
                y1={0}
                x2={84}
                y2={0}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#47EBEB" stopOpacity={0} />
                <stop offset={0.5} stopColor="#47EBEB" stopOpacity={0.15} />
                <stop offset={1} stopColor="#47EBEB" stopOpacity={0} />
            </linearGradient>
            <radialGradient
                id="paint2_radial_1493_965"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(64.5 256) rotate(-90.1119) scale(256.001 19.5078)"
            >
                <stop stopColor="#47EBEB" stopOpacity={0.1} />
                <stop offset={1} stopColor="#47EBEB" stopOpacity={0} />
            </radialGradient>
        </defs>
    </svg>
);
