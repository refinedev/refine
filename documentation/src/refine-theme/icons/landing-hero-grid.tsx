import clsx from "clsx";
import React from "react";

const rand = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const LandingHeroGridSvg = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="704"
        height="536"
        viewBox="0 0 704 536"
        fill="none"
        {...props}
        className={clsx(
            "bg-gray-50 dark:bg-gray-800",
            "dark:bg-noise",
            "duration-150",
            "ease-in-out",
            "transition-colors",
            "rounded-3xl",
            props.className,
        )}
    >
        <g mask="url(#bgMask)" className="heroAnimationBG">
            {Array.from({ length: 20 })
                .fill(null)
                .map((_, i) => {
                    return Array.from({ length: 16 })
                        .fill(null)
                        .map((_, j) => {
                            return (
                                <rect
                                    key={`${i}-${j}`}
                                    x={31 + 32 * i}
                                    y={12 + 32 * j}
                                    width="32"
                                    height="32"
                                    className={clsx(
                                        "fill-gray-300 dark:fill-gray-700",
                                        "stroke-[#EAEFF4] dark:stroke-[#26283D]",
                                        "animate-landing-hero-grid-beats",
                                        "duration-150",
                                        "ease-in-out",
                                        "transition-colors",
                                    )}
                                    style={{
                                        fillOpacity: 0,
                                        animationDirection: "normal",
                                        animationDelay: `${rand(0, 100)}s`,
                                        animationDuration: `${rand(15, 35)}s`,
                                    }}
                                />
                            );
                        });
                })}
        </g>

        <mask
            id="bgMask"
            width="704"
            height="536"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
            style={{
                maskType: "alpha",
            }}
        >
            <path fill="url(#maskGradient)" d="M0 0h704v536H0z"></path>
        </mask>
        <defs>
            <g className="defBase">
                <radialGradient
                    id="maskGradient"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="matrix(0 -268 352 0 352 268)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset=".475" stopColor="#303450"></stop>
                    <stop offset="1" stopColor="#303450" stopOpacity="0"></stop>
                </radialGradient>
            </g>
        </defs>
    </svg>
);
