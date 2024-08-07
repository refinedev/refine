import { useTheme } from "@mui/material";
import type { SVGProps } from "react";

export const ErrorCircleIcon = (props: SVGProps<SVGSVGElement>) => {
  const { palette } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        fill={palette.error.main}
        stroke="#fff"
        strokeWidth={2}
        d="m9.64 6.04-.194-.194.193.193ZM15 8A7 7 0 1 0 1 8a7 7 0 0 0 14 0Z"
      />
    </svg>
  );
};
