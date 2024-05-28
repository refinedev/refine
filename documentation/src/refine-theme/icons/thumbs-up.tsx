import * as React from "react";
import type { SVGProps } from "react";

export const ThumbsUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <title>Thumbs Up</title>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.92 6.394c-.012.025-.022.051-.03.078l-1.985 5.953A1 1 0 0 1 12 13H5V6.988a2 2 0 0 0 1.677-1.356L8.22 1H9.5a.5.5 0 0 1 .5.5V3a2 2 0 0 0 2 2h2a1 1 0 0 1 .92 1.394ZM4 7H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2V7Zm8 7a2 2 0 0 0 1.838-1.212l2-6A2 2 0 0 0 14 4h-2a1 1 0 0 1-1-1V1.5A1.5 1.5 0 0 0 9.5 0H8.22a1 1 0 0 0-.948.684L5.728 5.316A1 1 0 0 1 4.779 6H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10Z"
      clipRule="evenodd"
    />
  </svg>
);
