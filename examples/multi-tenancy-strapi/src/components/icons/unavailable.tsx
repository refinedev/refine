import type { SVGProps } from "react";

export const UnavailableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.45}
      strokeWidth={1.333}
      clipPath="url(#a)"
    >
      <path d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334ZM5.333 8h5.334" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#000" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
