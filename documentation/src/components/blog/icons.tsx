import clsx from "clsx";
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
        viewBox="0 0 50 50"
        {...props}
        className={clsx("dark:text-[#e7e9ea] text-[#0f1419]")}
    >
        <path
            fillRule="evenodd"
            d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"
            clipRule="evenodd"
            fill="currentColor"
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
