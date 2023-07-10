import * as React from "react";
import type { SVGProps } from "react";
const SvgPricingSupabaseIcon = (props: SVGProps<SVGSVGElement>) => (
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
            d="M13.903 23.5872C13.2794 24.3865 12.015 23.9486 12 22.928L12 8H21.8615C23.6476 8 24.6438 10.0999 23.5332 11.5237L13.903 23.5872Z"
            fill="url(#paint0_linear_2460_26732)"
        />
        <path
            d="M13.903 23.5872C13.2794 24.3865 12.015 23.9486 12 22.928L12 8H21.8615C23.6476 8 24.6438 10.0999 23.5332 11.5237L13.903 23.5872Z"
            fill="url(#paint1_linear_2460_26732)"
            fillOpacity={0.2}
        />
        <path
            d="M10.0772 0.412836C10.7073 -0.386576 11.9848 0.0514432 12 1.07209L12 16H2.1608C0.356015 16 -0.650547 13.9001 0.471722 12.4763L10.0772 0.412836Z"
            fill="#3ECF8E"
        />
        <defs>
            <linearGradient
                id="paint0_linear_2460_26732"
                x1={12}
                y1={11.3099}
                x2={20.8104}
                y2={14.9401}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#249361" />
                <stop offset={1} stopColor="#3ECF8E" />
            </linearGradient>
            <linearGradient
                id="paint1_linear_2460_26732"
                x1={8.11427}
                y1={5.89466}
                x2={12.2228}
                y2={13.493}
                gradientUnits="userSpaceOnUse"
            >
                <stop />
                <stop offset={1} stopOpacity={0} />
            </linearGradient>
        </defs>
    </svg>
);
export default SvgPricingSupabaseIcon;
