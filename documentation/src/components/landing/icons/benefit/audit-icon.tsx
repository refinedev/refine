import * as React from "react";
import { SVGProps } from "react";

const SvgAuditIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={54}
        height={50}
        viewBox="0 0 54 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M29.397 49.066c-6.194 0-12.201-2.44-16.706-6.57a2.01 2.01 0 0 1-.188-2.629 2.01 2.01 0 0 1 2.628-.187c8.26 7.884 21.4 7.32 29.096-.939 7.696-8.26 7.696-21.4-.751-29.283-8.447-7.884-21.4-7.321-29.096 1.126a20.533 20.533 0 0 0-5.631 14.079h3.378c.751 0 1.127.938.564 1.501l-2.065 2.253-3.191 3.191a.907.907 0 0 1-1.314 0l-3.004-3.191-2.252-2.253c-.564-.563-.188-1.501.75-1.501h3.38A24.354 24.354 0 0 1 29.396.26 24.354 24.354 0 0 1 53.8 24.663a24.354 24.354 0 0 1-24.403 24.402Z"
            fill="url(#audit-icon_svg__a)"
        />
        <path
            d="m38.22 34.987-9.198-5.256c-.751-.376-1.314-1.314-1.314-2.065V12.273c0-.938.75-1.689 1.69-1.689.938 0 1.689.75 1.689 1.69V25.6c0 .939.563 1.69 1.314 2.065l7.508 4.317c.751.376.939 1.502.563 2.253-.563.939-1.501 1.126-2.252.75Z"
            fill="url(#audit-icon_svg__b)"
        />
        <defs>
            <radialGradient
                id="audit-icon_svg__a"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(17.91104 28.90197 -36.74127 22.7692 20.163 14.295)"
            >
                <stop stopColor="#47EBF5" />
                <stop offset={0.893} stopColor="#1890FF" />
            </radialGradient>
            <radialGradient
                id="audit-icon_svg__b"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(17.91104 28.90197 -36.74127 22.7692 20.163 14.295)"
            >
                <stop stopColor="#47EBF5" />
                <stop offset={0.893} stopColor="#1890FF" />
            </radialGradient>
        </defs>
    </svg>
);

export default SvgAuditIcon;
