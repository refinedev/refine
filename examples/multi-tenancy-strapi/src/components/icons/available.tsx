import type { SVGProps } from "react";

export const AvailableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g
      stroke="#6ABE39"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      clipPath="url(#a)"
    >
      <path d="M14.667 7.387V8a6.666 6.666 0 1 1-3.954-6.093" />
      <path d="m6 7.333 2 2 6.667-6.666" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#6ABE39" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
