import React from "react";

export const AboutUsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect
            width="40"
            height="40"
            rx="20"
            fill="currentColor"
            className="text-white dark:text-refine-blue/20"
        />
        <rect
            width="40"
            height="40"
            rx="20"
            fill="currentColor"
            className="text-refine-blue"
            fillOpacity="0.1"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 12C17.7909 12 16 13.7909 16 16V24C16 26.2091 17.7909 28 20 28C22.2091 28 24 26.2091 24 24V16C24 13.7909 22.2091 12 20 12ZM17.6 16C17.6 14.6745 18.6745 13.6 20 13.6C21.3255 13.6 22.4 14.6745 22.4 16V24C22.4 25.3255 21.3255 26.4 20 26.4C18.6745 26.4 17.6 25.3255 17.6 24V16ZM20 17.6C20.8837 17.6 21.6 16.8837 21.6 16C21.6 15.1163 20.8837 14.4 20 14.4C19.1163 14.4 18.4 15.1163 18.4 16C18.4 16.8837 19.1163 17.6 20 17.6Z"
            fill="currentColor"
            className="text-refine-blue"
        />
    </svg>
);
