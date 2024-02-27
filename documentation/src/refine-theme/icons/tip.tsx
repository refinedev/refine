import React from "react";

export const TipIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M18 10c0 2.22-1.206 4.16-3 5.197V16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-.803A6 6 0 1 1 18 10Zm-7.414-1.414a1 1 0 0 0-1.414-1.414A3.99 3.99 0 0 0 8 10a3.99 3.99 0 0 0 1.172 2.828 1 1 0 0 0 1.414-1.414A1.99 1.99 0 0 1 10 10c0-.553.223-1.051.586-1.414Z"
      clipRule="evenodd"
    />
    <path fill="currentColor" d="M11 18a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2Z" />
  </svg>
);
