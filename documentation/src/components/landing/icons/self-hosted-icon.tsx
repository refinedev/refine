import clsx from "clsx";
import * as React from "react";
import { SVGProps } from "react";

export const SelfHostedIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={64}
        height={64}
        viewBox="0 0 64 64"
        fill="none"
        {...props}
        className={clsx(
            props.className,
            "dark:text-refine-blue-alt text-refine-blue",
        )}
    >
        <rect
            width={64}
            height={64}
            fill="url(#self-hosted-a)"
            fillOpacity={0.4}
            rx={16}
        />
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M37.1 17.7a8.5 8.5 0 0 0-10.2 0l-7.5 5.625a8.5 8.5 0 0 0-3.041 9.243l2.813 9.375a8.5 8.5 0 0 0 5.52 5.643 1 1 0 1 0 .616-1.902 6.501 6.501 0 0 1-4.22-4.316l-2.813-9.375a6.5 6.5 0 0 1 2.326-7.068l7.5-5.625a6.5 6.5 0 0 1 7.8 0l7.5 5.625a6.489 6.489 0 0 1 2.008 2.491 1 1 0 1 0 1.819-.832 8.489 8.489 0 0 0-2.627-3.259L37.1 17.7ZM28 33a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v4c0 .768-.289 1.47-.764 2 .475.53.764 1.232.764 2v4a3 3 0 0 1-3 3H31a3 3 0 0 1-3-3v-4c0-.768.289-1.47.764-2A2.989 2.989 0 0 1 28 37v-4Zm18 4a1 1 0 0 1-1 1H31a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4Zm-16 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H31a1 1 0 0 1-1-1v-4Zm4-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm3-1a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-1-7a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Z"
            clipRule="evenodd"
        />
        <rect
            width={63}
            height={63}
            x={0.5}
            y={0.5}
            stroke="url(#self-hosted-b)"
            strokeOpacity={0.5}
            rx={15.5}
        />
        <defs>
            <radialGradient
                id="self-hosted-a"
                cx={0}
                cy={0}
                r={1}
                gradientTransform="rotate(45) scale(90.5097)"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="currentColor" />
                <stop offset={1} stopColor="currentColor" stopOpacity={0.25} />
            </radialGradient>
            <radialGradient
                id="self-hosted-b"
                cx={0}
                cy={0}
                r={1}
                gradientTransform="rotate(45) scale(90.5097)"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="currentColor" />
                <stop offset={0.5} stopColor="currentColor" stopOpacity={0} />
                <stop offset={1} stopColor="currentColor" stopOpacity={0.25} />
            </radialGradient>
        </defs>
    </svg>
);
