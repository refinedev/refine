import type { SVGProps } from "react";

export const AssetsIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.338 14.333h-.934c-2.39 0-3.585 0-4.328-.756-.743-.757-.743-1.975-.743-4.41 0-2.436 0-3.654.743-4.41C2.819 4 4.014 4 6.404 4h2.535c2.39 0 3.585 0 4.328.757.571.582.703 1.437.733 2.91v1"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      d="M12.666 12.333h-2m0 2a2 2 0 1 1 0-4m2 4a2 2 0 1 0 0-4"
    />
    <path
      stroke="currentColor"
      d="m10.666 4-.066-.206c-.33-1.027-.495-1.54-.888-1.834-.392-.293-.914-.293-1.958-.293H7.58c-1.044 0-1.566 0-1.958.293-.393.294-.558.807-.888 1.834L4.667 4"
    />
  </svg>
);
