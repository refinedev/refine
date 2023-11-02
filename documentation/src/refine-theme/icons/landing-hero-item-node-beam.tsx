import React from "react";

export const LandingHeroItemNodeBeam = (
    props: React.SVGProps<SVGSVGElement>,
) => (
    <svg
        width={172}
        height={100}
        viewBox="0 0 172 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <mask
            id="mask0_0_8"
            style={{
                maskType: "alpha",
            }}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={172}
            height={100}
        >
            <path
                d="M1.99992 1.99998V43.3726C1.99992 47.616 3.68563 51.6857 6.68622 54.6863L45.3136 93.3137C48.3142 96.3143 52.3839 98 56.6273 98H170"
                stroke="black"
                strokeWidth={2}
            />
            <circle cx={170} cy={98} r={2} fill="black" />
            <circle cx={2} cy={2} r={2} fill="black" />
        </mask>
        <g mask="url(#mask0_0_8)">
            <circle
                cx={172.999}
                cy={4.9995}
                r={179}
                fill="url(#paint0_angular_0_8)"
            />
        </g>
        <defs>
            <radialGradient
                id="paint0_angular_0_8"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(172.999 4.9995) rotate(90) scale(179)"
            >
                <stop stopColor="currentColor" />
                <stop
                    offset={0.333333}
                    stopColor="currentColor"
                    stopOpacity={0}
                />
                <stop
                    offset={0.666667}
                    stopColor="currentColor"
                    stopOpacity={0}
                />
                <stop offset={1} stopColor="currentColor" stopOpacity={0} />
            </radialGradient>
        </defs>
    </svg>
);
