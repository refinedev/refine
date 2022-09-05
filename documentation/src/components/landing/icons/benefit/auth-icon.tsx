import * as React from "react";
import { SVGProps } from "react";

const SvgAuthIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={54}
        height={51}
        viewBox="0 0 54 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M38.807 50.26H15.593a1.45 1.45 0 1 1 0-2.901h2.689l1.335-6.771H5.92a5.321 5.321 0 0 1-5.32-5.32V6.25A5.322 5.322 0 0 1 5.92.93h42.56a5.322 5.322 0 0 1 5.32 5.32v29.018a5.322 5.322 0 0 1-5.32 5.32H34.783l1.335 6.77h2.69a1.45 1.45 0 1 1 0 2.903ZM21.242 47.36h11.917l-1.335-6.771h-9.247l-1.335 6.77ZM3.502 35.267a2.419 2.419 0 0 0 2.418 2.418h42.56a2.419 2.419 0 0 0 2.418-2.418V32.85H3.502v2.418Zm0-5.32h47.396V6.25A2.419 2.419 0 0 0 48.48 3.83H5.92A2.419 2.419 0 0 0 3.5 6.25v23.698Zm15.96-5.803a7.255 7.255 0 1 1 7.1-8.706h14.18a1.45 1.45 0 1 1 0 2.902h-.484v2.418a1.45 1.45 0 1 1-2.902 0V18.34h-2.901v2.418a1.45 1.45 0 1 1-2.902 0V18.34h-4.991a7.235 7.235 0 0 1-7.1 5.804Zm0-11.608a4.354 4.354 0 0 0-3.078 7.431 4.354 4.354 0 0 0 7.43-3.078 4.354 4.354 0 0 0-4.352-4.353Z"
            fill="url(#auth-icon_svg__a)"
        />
        <defs>
            <radialGradient
                id="auth-icon_svg__a"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(17.91103 29.21304 -36.95852 22.65993 20.164 15.116)"
            >
                <stop stopColor="#47EBF5" />
                <stop offset={0.893} stopColor="#1890FF" />
            </radialGradient>
        </defs>
    </svg>
);

export default SvgAuthIcon;
