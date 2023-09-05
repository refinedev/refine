import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
    active?: boolean;
    hovered?: boolean;
};

export const RefineDevtoolsIcon = ({ active, hovered, ...props }: Props) => (
    <svg
        width={42}
        height={42}
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.3043 1.10851C19.2603 -0.369505 22.7397 -0.369505 25.6957 1.10851L36.1957 6.35852C39.753 8.13713 42 11.7729 42 15.75V26.25C42 30.2271 39.753 33.8629 36.1957 35.6415L25.6957 40.8915C22.7397 42.3695 19.2603 42.3695 16.3043 40.8915L5.80426 35.6415C2.24702 33.8629 0 30.2271 0 26.25V15.75C0 11.7729 2.24702 8.13713 5.80426 6.35852L16.3043 1.10851Z"
            fill="#1D1E30"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.7975 13.2C14.7975 9.77583 17.5733 7 20.9975 7C24.4217 7 27.1975 9.77583 27.1975 13.2V28.8C27.1975 32.2242 24.4217 35 20.9975 35C17.5733 35 14.7975 32.2242 14.7975 28.8V13.2ZM20.9975 8C18.1256 8 15.7975 10.3281 15.7975 13.2V28.8C15.7975 31.6719 18.1256 34 20.9975 34C23.8694 34 26.1975 31.6719 26.1975 28.8V13.2C26.1975 10.3281 23.8694 8 20.9975 8Z"
            fill="url(#devtools_icon_gradient_1)"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.5279 2.05573C19.3431 0.648091 22.6569 0.648091 25.4721 2.05573L35.4721 7.05573C38.86 8.74965 41 12.2123 41 16V26C41 29.7877 38.86 33.2504 35.4721 34.9443L25.4721 39.9443C22.6569 41.3519 19.3431 41.3519 16.5279 39.9443L6.52786 34.9443C3.14002 33.2504 1 29.7877 1 26V16C1 12.2123 3.14002 8.74965 6.52786 7.05573L16.5279 2.05573ZM16.9751 2.95016C19.5088 1.68328 22.4912 1.68328 25.0249 2.95016L35.0249 7.95016C38.074 9.47468 40 12.5911 40 16V26C40 29.4089 38.074 32.5253 35.0249 34.0498L25.0249 39.0498C22.4912 40.3167 19.5088 40.3167 16.9751 39.0498L6.97508 34.0498C3.92602 32.5253 2 29.4089 2 26V16C2 12.5911 3.92602 9.47468 6.97508 7.95016L16.9751 2.95016Z"
            fill="url(#devtools_icon_gradient_2)"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.9751 2.95016C19.5088 1.68328 22.4912 1.68328 25.0249 2.95016L35.0249 7.95016C38.074 9.47468 40 12.5911 40 16V26C40 29.4089 38.074 32.5253 35.0249 34.0498L25.0249 39.0498C22.4912 40.3167 19.5088 40.3167 16.9751 39.0498L6.97508 34.0498C3.92602 32.5253 2 29.4089 2 26V16C2 12.5911 3.92602 9.47468 6.97508 7.95016L16.9751 2.95016ZM20.9975 7C17.5733 7 14.7975 9.77583 14.7975 13.2V28.8C14.7975 32.2242 17.5733 35 20.9975 35C24.4217 35 27.1975 32.2242 27.1975 28.8V13.2C27.1975 9.77583 24.4217 7 20.9975 7Z"
            fill="url(#devtools_icon_gradient_3)"
        />
        <circle
            cx={21}
            cy={13.3301}
            r={4}
            fill="url(#devtools_icon_gradient_2)"
            style={{
                transition: "transform ease-in-out 0.2s",
                transform: `translateY(${
                    active ? "0" : hovered ? "15px" : "15px"
                })`,
            }}
        />
        <defs>
            <linearGradient
                id="devtools_icon_gradient_1"
                x1={21}
                y1={7}
                x2={21}
                y2={35}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#47EBEB" />
                <stop offset={1} stopColor="#47EBEB" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient
                id="devtools_icon_gradient_2"
                x1={21}
                y1={1}
                x2={21}
                y2={41}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#47EBEB" />
                <stop offset={0.5} stopColor="#47EBEB" stopOpacity={0.5} />
                <stop offset={1} stopColor="#47EBEB" stopOpacity={0.5} />
            </linearGradient>
            <radialGradient
                id="devtools_icon_gradient_3"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(21 1) rotate(90) scale(40)"
            >
                <stop stopColor="#47EBEB" stopOpacity={0} />
                <stop offset={0.5} stopColor="#47EBEB" stopOpacity={0.25} />
                <stop offset={1} stopColor="#47EBEB" stopOpacity={0.5} />
            </radialGradient>
        </defs>
    </svg>
);
