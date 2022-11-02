import React, { FC, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
}

const PurpleGradientSvg: FC<Props> = ({
    width = 524,
    height = 518,
    ...props
}) => {
    return (
        <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={`${width}px`}
            height={`${height}px`}
            viewBox={`0 0 ${width} ${height}`}
            {...props}
        >
            <circle cx="256" cy="262" r="262" fill="url(#blue)" />
            <defs>
                <radialGradient
                    id="blue"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="rotate(138.504 78.3738 179.4898) scale(251.144)"
                >
                    <stop stopColor="#1890FF" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    );
};

export default PurpleGradientSvg;
