import React, { SVGProps } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";

export const NewBadgeIcon = (props: React.SVGProps<SVGSVGElement>) => {
    const { colorMode } = useColorMode();

    if (colorMode === "dark") {
        return <NewBadgeDark {...props} />;
    }

    return <NewBadgeLight {...props} />;
};

export const NewBadgeDark = (props: SVGProps<SVGSVGElement>) => {
    return (
        <div
            className={clsx(
                "flex",
                "items-center",
                "justify-center",
                "w-[32px]",
                "h-[15px]",
                "rounded-full",
                "bg-header-menu-new-badge-dark",
                "animate-header-menu-new-badge",
            )}
            style={{
                backgroundSize: "400% 400%",
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={31}
                height={14}
                viewBox="0 0 31 14"
                fill="none"
                className={clsx("bg-gray-900", "rounded-full")}
                {...props}
            >
                <rect
                    width={30}
                    height={13}
                    x={0.5}
                    y={0.5}
                    fill="#26D97F"
                    fillOpacity={0.1}
                    rx={6.5}
                />
                <rect
                    width={30}
                    height={13}
                    x={0.5}
                    y={0.5}
                    stroke="#26D97F"
                    strokeOpacity={0.2}
                    rx={6.5}
                />
                <rect
                    width={30}
                    height={13}
                    x={0.5}
                    y={0.5}
                    stroke="url(#new-badge-dark-a)"
                    rx={6.5}
                />
                <path
                    fill="#26D97F"
                    d="M11.433 4.182V10h-.937L7.754 6.037h-.048V10H6.652V4.182h.943l2.739 3.966h.05V4.182h1.05ZM12.582 10V4.182h3.784v.883h-2.73v1.58h2.534v.883h-2.534v1.588h2.753V10h-3.807Zm6.084 0-1.643-5.818h1.134l1.048 4.275h.054l1.12-4.275h1.03l1.123 4.278h.051l1.048-4.278h1.134L23.123 10h-1.04l-1.165-4.082h-.045L19.705 10h-1.04Z"
                />
                <defs>
                    <radialGradient
                        id="new-badge-dark-a"
                        cx={0}
                        cy={0}
                        r={1}
                        gradientTransform="matrix(0 7 -15.5 0 15.5 7)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#26D97F" stopOpacity={0} />
                        <stop
                            offset={0.125}
                            stopColor="#26D97F"
                            stopOpacity={0.5}
                        />
                        <stop
                            offset={0.25}
                            stopColor="#26D97F"
                            stopOpacity={0}
                        />
                        <stop
                            offset={0.375}
                            stopColor="#26D97F"
                            stopOpacity={0}
                        />
                        <stop
                            offset={0.5}
                            stopColor="#26D97F"
                            stopOpacity={0}
                        />
                        <stop offset={0.625} stopColor="#26D97F" />
                        <stop
                            offset={0.75}
                            stopColor="#26D97F"
                            stopOpacity={0}
                        />
                        <stop
                            offset={0.875}
                            stopColor="#26D97F"
                            stopOpacity={0}
                        />
                        <stop offset={1} stopColor="#26D97F" stopOpacity={0} />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
};

const NewBadgeLight = (props: SVGProps<SVGSVGElement>) => {
    return (
        <div
            className={clsx(
                "flex",
                "items-center",
                "justify-center",
                "w-[32px]",
                "h-[15px]",
                "rounded-full",
                "bg-header-menu-new-badge-light",
                "animate-header-menu-new-badge",
            )}
            style={{
                backgroundSize: "400% 400%",
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={31}
                height={14}
                viewBox="0 0 31 14"
                fill="none"
                className={clsx("bg-gray-0", "rounded-full")}
                {...props}
            >
                <rect
                    width={30}
                    height={13}
                    x={0.5}
                    y={0.5}
                    fill="#007FFF"
                    fillOpacity={0.1}
                    rx={6.5}
                />
                <rect
                    width={30}
                    height={13}
                    x={0.5}
                    y={0.5}
                    stroke="#0080FF"
                    strokeOpacity={0.2}
                    rx={6.5}
                />
                <rect
                    width={30}
                    height={13}
                    x={0.5}
                    y={0.5}
                    stroke="url(#new-badge-light-a)"
                    rx={6.5}
                />
                <path
                    fill="#0080FF"
                    d="M11.433 4.182V10h-.937L7.754 6.037h-.048V10H6.652V4.182h.943l2.739 3.966h.05V4.182h1.05ZM12.582 10V4.182h3.784v.883h-2.73v1.58h2.534v.883h-2.534v1.588h2.753V10h-3.807Zm6.084 0-1.643-5.818h1.134l1.048 4.275h.054l1.12-4.275h1.03l1.123 4.278h.051l1.048-4.278h1.134L23.123 10h-1.04l-1.165-4.082h-.045L19.705 10h-1.04Z"
                />
                <defs>
                    <radialGradient
                        id="new-badge-light-a"
                        cx={0}
                        cy={0}
                        r={1}
                        gradientTransform="matrix(0 7 -15.5 0 15.5 7)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0080FF" stopOpacity={0} />
                        <stop
                            offset={0.125}
                            stopColor="#0080FF"
                            stopOpacity={0.5}
                        />
                        <stop
                            offset={0.25}
                            stopColor="#0080FF"
                            stopOpacity={0}
                        />
                        <stop
                            offset={0.375}
                            stopColor="#0080FF"
                            stopOpacity={0}
                        />
                        <stop
                            offset={0.5}
                            stopColor="#0080FF"
                            stopOpacity={0}
                        />
                        <stop offset={0.625} stopColor="#0080FF" />
                        <stop
                            offset={0.75}
                            stopColor="#0080FF"
                            stopOpacity={0}
                        />
                        <stop
                            offset={0.875}
                            stopColor="#0080FF"
                            stopOpacity={0}
                        />
                        <stop offset={1} stopColor="#0080FF" stopOpacity={0} />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
};
