import type { SVGProps } from "react";

export const DirectoryIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g stroke="currentColor" clipPath="url(#directory-a)">
      <path d="M3 6.667c0-2.515 0-3.772.781-4.553.781-.78 2.038-.78 4.552-.78h1c2.514 0 3.772 0 4.553.78.78.781.78 2.038.78 4.553v2.666c0 2.514 0 3.771-.78 4.553-.781.78-2.038.78-4.553.78h-1c-2.514 0-3.77 0-4.552-.78C3 13.104 3 11.847 3 9.332V6.667Z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4H1.333M3 8H1.333M3 12H1.333"
      />
      <path
        strokeLinecap="round"
        d="M6.5 11c.806-1.72 3.808-1.834 4.667 0m-1-4.667a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"
      />
    </g>
    <defs>
      <clipPath id="directory-a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
