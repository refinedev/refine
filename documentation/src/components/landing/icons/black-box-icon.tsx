import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

export const BlackBoxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
    className={clsx(
      props.className,
      "dark:text-refine-purple-alt text-refine-purple",
    )}
  >
    <rect
      width={64}
      height={64}
      fill="url(#black-box-a)"
      fillOpacity={0.4}
      rx={16}
    />
    <rect
      width={63}
      height={63}
      x={0.5}
      y={0.5}
      stroke="url(#black-box-b)"
      strokeOpacity={0.5}
      rx={15.5}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M30 47h4M17 32c0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15 0 5.928-3.438 11.052-8.43 13.488a.247.247 0 0 1-.331-.119l-3.595-7.704a.258.258 0 0 1 .118-.337 6 6 0 1 0-5.524 0 .258.258 0 0 1 .118.337l-3.595 7.704a.247.247 0 0 1-.332.12C20.44 43.051 17 37.927 17 32Z"
    />
    <defs>
      <radialGradient
        id="black-box-a"
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
        id="black-box-b"
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
