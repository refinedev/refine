import type { SVGProps } from "react";

export const ExpenseIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.001 6.005c-.736 0-1.333.447-1.333 1 0 .552.597 1 1.333 1 .737 0 1.334.447 1.334 1 0 .552-.597 1-1.334 1m0-4c.58 0 1.075.278 1.258.666M8 6.005v-.667m0 4.667c-.58 0-1.074-.279-1.257-.667M8 10.005v.666"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      d="M8.666 1.671H8c-2.986 0-4.478 0-5.406.928-.927.927-.927 2.42-.927 5.406 0 2.985 0 4.478.927 5.405.928.928 2.42.928 5.406.928 2.985 0 4.478 0 5.406-.927.927-.928.927-2.42.927-5.406v-.667"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.325 1.662-2.783 2.785m-.55-2.437.079 2.06c0 .486.29.79.818.827l2.083.098"
    />
  </svg>
);
