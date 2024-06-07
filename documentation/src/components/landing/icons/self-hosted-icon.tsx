import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

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
      "dark:text-refine-green-alt text-refine-green",
    )}
  >
    <rect
      width={64}
      height={64}
      fill="url(#security-a)"
      fillOpacity={0.4}
      rx={16}
    />
    <rect
      width={63}
      height={63}
      x={0.5}
      y={0.5}
      stroke="url(#security-b)"
      strokeOpacity={0.5}
      rx={15.5}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M45.077 42c.345-1.341.607-3.045.944-5.241l.452-2.939c.53-3.446.794-5.169.143-6.696-.652-1.527-2.097-2.572-4.988-4.662l-2.16-1.562C35.872 18.3 34.075 17 32 17s-3.873 1.3-7.468 3.9l-2.16 1.562c-2.891 2.09-4.336 3.135-4.988 4.662-.651 1.527-.386 3.25.143 6.696l.452 2.939c.337 2.197.599 3.9.944 5.241M32 43h4m-8 0h1m3-8h4m-8 0h1m9 4H26m12 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H26a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2m12 0a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H26a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2"
    />
    <defs>
      <radialGradient
        id="security-a"
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
        id="security-b"
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
