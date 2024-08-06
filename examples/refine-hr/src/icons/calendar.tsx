import type { SVGProps } from "react";

export const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.333 8.667h3.334m-5.333 0h.005m3.328 2.666H5.334m5.333 0h-.006M12 1.333v1.334M4 1.333v1.334M1.667 8.162c0-2.905 0-4.357.834-5.26C3.336 2 4.68 2 7.366 2h1.267c2.687 0 4.03 0 4.865.902.835.903.835 2.355.835 5.26v.343c0 2.904 0 4.357-.835 5.26-.834.902-2.178.902-4.865.902H7.367c-2.688 0-4.031 0-4.866-.903-.834-.902-.834-2.355-.834-5.26v-.342ZM2 5.333h12"
    />
  </svg>
);
