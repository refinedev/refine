import React, { FC, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
}

const GradientSvgPurple: FC<Props> = ({
    width = 428,
    height = 524,
    ...props
}) => {
    return (
        <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={`${width}px`}
            height={`${height}px`}
            viewBox={`0 0 ${height} ${width}`}
            {...props}
        >
            <circle cx="256" cy="262" r="262" fill="url(#purple)" />
            <defs>
                <radialGradient
                    id="purple"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="rotate(138.504 81.3738 180.6262) scale(251.144)"
                >
                    <stop stopColor="#CEB2EE" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    );
};

export default GradientSvgPurple;
