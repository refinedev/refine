import type { SVGProps } from "react";

export const NewEmployeeIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8 8v5.334M8 8v.667h2a4 4 0 0 0 4-4V4h-2a4 4 0 0 0-4 4ZM8 6.667v.666H6a4 4 0 0 1-4-4v-.666h2a4 4 0 0 1 4 4Z"
    />
  </svg>
);
