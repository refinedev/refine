import type { SVGProps } from "react";

export const BirthdayIcon = (props: SVGProps<SVGSVGElement>) => (
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
      strokeLinejoin="round"
      d="M9 3a1 1 0 0 1-2 0c0-.552 1-1.667 1-1.667S9 2.449 9 3Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 4v2"
    />
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      d="M11.777 9.333c1.044 0 1.89-.746 1.89-1.666 0-.92-.846-1.667-1.89-1.667H4.223c-1.043 0-1.889.746-1.889 1.667 0 .92.846 1.666 1.889 1.666.914 0 1.714-.572 1.889-1.333.175.76.975 1.333 1.889 1.333.913 0 1.714-.572 1.889-1.333.175.76.975 1.333 1.889 1.333Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3.333 9.334.347 1.72c.35 1.73.525 2.596 1.117 3.105.592.508 1.427.508 3.095.508h.215c1.669 0 2.503 0 3.095-.508.593-.509.768-1.374 1.117-3.106l.347-1.72"
    />
  </svg>
);
