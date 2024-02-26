import React from "react";

export const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm0-12a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm0 8a1 1 0 0 0 1-1v-3a1 1 0 1 0-2 0v3a1 1 0 0 0 1 1Z"
      clipRule="evenodd"
    />
  </svg>
);
