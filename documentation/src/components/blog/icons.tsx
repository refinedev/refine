import React from "react";

export const ChevronLeft = (
    props: React.SVGProps<SVGSVGElement>,
): JSX.Element => (
    <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
        ></path>
    </svg>
);

export const ChevronRight = (
    props: React.SVGProps<SVGSVGElement>,
): JSX.Element => (
    <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
        ></path>
    </svg>
);

export const Github = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            fillRule="evenodd"
            d="M12.058 0a11.894 11.894 0 0 0-7.814 2.929 12.37 12.37 0 0 0-4.088 7.404 12.523 12.523 0 0 0 1.588 8.344A12.094 12.094 0 0 0 8.25 23.98c.606.112.82-.273.82-.597V21.29c-3.364.747-4.073-1.655-4.073-1.655A3.285 3.285 0 0 0 3.66 17.83c-1.088-.755.088-.755.088-.755.382.055.745.196 1.064.417.32.22.584.511.777.85.164.304.384.571.65.787a2.523 2.523 0 0 0 2.855.241 2.631 2.631 0 0 1 .74-1.646c-2.677-.31-5.487-1.367-5.487-6.042a4.816 4.816 0 0 1 1.235-3.3A4.575 4.575 0 0 1 5.7 5.127s1.012-.333 3.311 1.261a11.156 11.156 0 0 1 6.034 0c2.3-1.593 3.305-1.261 3.305-1.261a4.55 4.55 0 0 1 .147 3.232 4.816 4.816 0 0 1 1.235 3.301c0 4.728-2.816 5.762-5.501 6.041.288.296.51.651.652 1.042.142.39.199.808.17 1.224v3.377c0 .4.213.71.827.59a12.1 12.1 0 0 0 6.414-5.322 12.524 12.524 0 0 0 1.548-8.29 12.37 12.37 0 0 0-4.047-7.36A11.897 11.897 0 0 0 12.058 0Z"
            clipRule="evenodd"
        />
    </svg>
);

export const Twitter = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <rect width={24} height={24} fill="#1DA1F2" rx={12} />
        <path
            fill="#fff"
            fillRule="evenodd"
            d="M18.667 7.76a5.343 5.343 0 0 1-1.57.442 2.8 2.8 0 0 0 1.202-1.551 5.389 5.389 0 0 1-1.738.68 2.698 2.698 0 0 0-1.996-.886c-1.51 0-2.735 1.256-2.735 2.805 0 .22.024.434.07.64-2.273-.118-4.289-1.234-5.639-2.932-.243.43-.37.916-.37 1.41 0 .973.484 1.832 1.217 2.336a2.685 2.685 0 0 1-1.239-.35v.034c0 1.36.943 2.493 2.195 2.75-.234.067-.477.1-.72.099-.177 0-.349-.017-.516-.05.348 1.114 1.358 1.926 2.555 1.947a5.4 5.4 0 0 1-4.05 1.163 7.616 7.616 0 0 0 4.194 1.26c5.032 0 7.783-4.274 7.783-7.981 0-.122-.003-.244-.007-.363a5.609 5.609 0 0 0 1.364-1.452Z"
            clipRule="evenodd"
        />
    </svg>
);

export const Linkedin = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <rect width={24} height={24} fill="#0A66C2" rx={12} />
        <path
            fill="#fff"
            d="M9.364 16.762H7.385V10.4h1.979v6.362ZM8.375 9.53a1.146 1.146 0 1 1 0-2.293 1.146 1.146 0 0 1 0 2.293Zm8.395 7.233h-1.977v-3.094c0-.738-.013-1.687-1.027-1.687-1.03 0-1.188.803-1.188 1.633v3.148h-1.974V10.4H12.5v.87h.027c.263-.5.908-1.028 1.871-1.028 2.003 0 2.372 1.318 2.372 3.031v3.49h-.001Z"
        />
    </svg>
);
