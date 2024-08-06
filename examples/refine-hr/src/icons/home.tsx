import type { SVGProps } from "react";

export const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#home-a)"
    >
      <path strokeLinecap="round" d="M6.667 12h2.666" />
      <path d="M1.568 8.809c-.236-1.532-.353-2.297-.064-2.976.29-.679.932-1.143 2.217-2.072l.96-.694C6.279 1.91 7.078 1.333 8 1.333c.921 0 1.72.578 3.319 1.734l.96.694c1.284.929 1.927 1.393 2.216 2.072.29.679.172 1.444-.063 2.976l-.201 1.306c-.334 2.17-.5 3.256-1.28 3.904-.778.648-1.916.648-4.193.648H7.241c-2.277 0-3.415 0-4.193-.648-.78-.648-.946-1.733-1.28-3.904l-.2-1.306Z" />
    </g>
    <defs>
      <clipPath id="home-a">
        <path fill="currentColor" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
