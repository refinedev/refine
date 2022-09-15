import * as React from "react";
import { SVGProps } from "react";

const SvgNextjs = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={64}
        height={64}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clipPath="url(#nextjs_svg__a)">
            <mask
                id="nextjs_svg__b"
                style={{
                    maskType: "alpha",
                }}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={64}
                height={64}
            >
                <path
                    d="M32 64c17.673 0 32-14.327 32-32C64 14.327 49.673 0 32 0 14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32Z"
                    fill="#000"
                />
            </mask>
            <g mask="url(#nextjs_svg__b)">
                <path
                    d="M32 64c17.673 0 32-14.327 32-32C64 14.327 49.673 0 32 0 14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32Z"
                    fill="#000"
                />
                <path
                    d="M53.159 56.007 24.584 19.2H19.2v25.59h4.307V24.67l26.27 33.941a32.11 32.11 0 0 0 3.382-2.604Z"
                    fill="url(#nextjs_svg__c)"
                />
                <path
                    d="M45.155 19.2H40.89v25.6h4.266V19.2Z"
                    fill="url(#nextjs_svg__d)"
                />
            </g>
        </g>
        <defs>
            <linearGradient
                id="nextjs_svg__c"
                x1={38.756}
                y1={41.422}
                x2={51.378}
                y2={57.067}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#fff" />
                <stop offset={1} stopColor="#fff" stopOpacity={0} />
            </linearGradient>
            <linearGradient
                id="nextjs_svg__d"
                x1={43.022}
                y1={19.2}
                x2={42.95}
                y2={38}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#fff" />
                <stop offset={1} stopColor="#fff" stopOpacity={0} />
            </linearGradient>
            <clipPath id="nextjs_svg__a">
                <path fill="#fff" d="M0 0h64v64H0z" />
            </clipPath>
        </defs>
    </svg>
);

export default SvgNextjs;
