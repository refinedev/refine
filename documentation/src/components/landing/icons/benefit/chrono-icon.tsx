import * as React from "react";
import { SVGProps } from "react";

const SvgChronoIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={49}
        height={54}
        viewBox="0 0 49 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M26.434 32.215a2.975 2.975 0 0 1-4.196 0 2.945 2.945 0 0 1-.869-2.088V21.27a2.95 2.95 0 0 1 1.483-2.557 2.98 2.98 0 0 1 2.967 0 2.95 2.95 0 0 1 1.483 2.556v8.858c0 .784-.312 1.535-.868 2.088Z"
            fill="url(#chrono-icon_svg__a)"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.186 44.135A23.545 23.545 0 0 1 .6 30.127a23.543 23.543 0 0 1 4.187-13.345A23.719 23.719 0 0 1 15.82 8.13l-2.493-2.48a2.944 2.944 0 0 1-.003-4.19 2.976 2.976 0 0 1 2.11-.86h17.801c.793-.02 1.56.275 2.132.822a2.945 2.945 0 0 1 .064 4.198L32.94 8.1a23.775 23.775 0 0 1 5.933 3.396l4.154-4.134a2.978 2.978 0 0 1 2.771-.589 2.958 2.958 0 0 1 2.004 1.994 2.94 2.94 0 0 1-.592 2.758l-4.153 4.134a23.549 23.549 0 0 1 5.005 13.865 23.538 23.538 0 0 1-4.226 14.12 23.725 23.725 0 0 1-11.812 8.882 23.843 23.843 0 0 1-14.803.188 23.73 23.73 0 0 1-12.035-8.58ZM36.923 17.6a17.845 17.845 0 0 0-12.587-5.189 17.845 17.845 0 0 0-12.588 5.19 17.672 17.672 0 0 0-5.214 12.526c0 4.698 1.876 9.204 5.214 12.527a17.847 17.847 0 0 0 12.588 5.188c4.72 0 9.249-1.866 12.587-5.188a17.672 17.672 0 0 0 5.214-12.527c0-4.698-1.875-9.204-5.214-12.527Z"
            fill="url(#chrono-icon_svg__b)"
        />
        <defs>
            <radialGradient
                id="chrono-icon_svg__a"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(15.98218 31.50424 -36.08795 18.30751 18.057 15.899)"
            >
                <stop stopColor="#47EBF5" />
                <stop offset={0.893} stopColor="#1890FF" />
            </radialGradient>
            <radialGradient
                id="chrono-icon_svg__b"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(15.98218 31.50424 -36.08795 18.30751 18.057 15.899)"
            >
                <stop stopColor="#47EBF5" />
                <stop offset={0.893} stopColor="#1890FF" />
            </radialGradient>
        </defs>
    </svg>
);

export default SvgChronoIcon;
