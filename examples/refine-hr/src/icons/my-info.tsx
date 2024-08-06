import type { SVGProps } from "react";

export const MyInfoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1.333 8c0-2.828 0-4.243.977-5.121C3.286 2 4.857 2 8 2c3.143 0 4.714 0 5.69.879.977.878.977 2.293.977 5.121 0 2.828 0 4.243-.976 5.121C12.713 14 11.143 14 8 14c-3.144 0-4.715 0-5.691-.879-.977-.878-.977-2.293-.977-5.121Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      d="M3.333 11C4.14 9.28 7.143 9.166 8 11M7 6.333a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6.667h2.667M10 9.333h2.667"
    />
  </svg>
);
