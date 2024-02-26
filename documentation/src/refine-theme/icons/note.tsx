import React from "react";

export const NoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M7 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-.586-1.414l-4-4A2 2 0 0 0 13 4H7Zm2 7a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm-1 5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Z"
      clipRule="evenodd"
    />
  </svg>
);
