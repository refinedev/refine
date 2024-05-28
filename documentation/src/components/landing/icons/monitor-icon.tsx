import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

export const MonitorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
    className={clsx(props.className, "text-refine-red")}
  >
    <rect
      width={64}
      height={64}
      fill="url(#monitor-a)"
      fillOpacity={0.3}
      rx={16}
    />
    <rect
      width={63}
      height={63}
      x={0.5}
      y={0.5}
      stroke="url(#monitor-b)"
      strokeOpacity={0.5}
      rx={15.5}
    />
    <path
      fill="currentColor"
      d="M22.316 40.684a1 1 0 1 0 2 0h-2Zm2-4.737a1 1 0 1 0-2 0h2Zm5.895 4.737a1 1 0 1 0 2 0h-2Zm2-14.21a1 1 0 1 0-2 0h2Zm5.894 14.21a1 1 0 1 0 2 0h-2Zm2-6.316a1 1 0 0 0-2 0h2Zm7.888-3.96a1 1 0 0 0-2 .026l2-.026Zm-3.19 14.395.708.708-.708-.708Zm-25.606 0-.707.708.707-.708Zm0-25.606-.707-.707.707.707ZM32 17v1-1Zm1.579 1a1 1 0 1 0 0-2v2Zm-9.263 22.684v-4.737h-2v4.737h2Zm7.895 0v-14.21h-2v14.21h2Zm7.894 0v-6.316h-2v6.316h2ZM46 21.737a3.737 3.737 0 0 1-3.737 3.737v2A5.737 5.737 0 0 0 48 21.737h-2Zm-3.737 3.737a3.737 3.737 0 0 1-3.737-3.737h-2a5.737 5.737 0 0 0 5.737 5.737v-2Zm-3.737-3.737A3.737 3.737 0 0 1 42.263 18v-2a5.737 5.737 0 0 0-5.737 5.737h2ZM42.263 18A3.737 3.737 0 0 1 46 21.737h2A5.737 5.737 0 0 0 42.263 16v2Zm4.73 12.421-1 .013v.024l.001.073A120.866 120.866 0 0 1 46 32h2c0-.524-.002-.92-.004-1.187l-.002-.302v-.076l-.001-.02v-.007l-1 .013ZM46 32c0 3.564-.002 6.136-.266 8.096-.26 1.932-.756 3.119-1.638 4l1.415 1.415c1.315-1.316 1.916-2.995 2.206-5.148.285-2.125.283-4.856.283-8.363h-2Zm-1.904 12.096c-.881.882-2.068 1.379-4 1.638-1.96.264-4.532.266-8.096.266v2c3.507 0 6.238.002 8.363-.283 2.153-.29 3.832-.891 5.148-2.206l-1.415-1.415ZM32 46c-3.564 0-6.136-.002-8.096-.266-1.932-.26-3.119-.756-4-1.638l-1.414 1.415c1.315 1.315 2.994 1.916 5.147 2.206 2.125.285 4.856.283 8.363.283v-2Zm-12.096-1.904c-.882-.881-1.379-2.068-1.638-4C18.002 38.136 18 35.564 18 32h-2c0 3.507-.002 6.238.284 8.363.289 2.153.89 3.832 2.206 5.148l1.414-1.415ZM18 32c0-3.564.002-6.136.266-8.096.26-1.932.756-3.119 1.638-4L18.49 18.49c-1.316 1.315-1.917 2.994-2.206 5.147C15.998 25.762 16 28.493 16 32h2Zm1.904-12.096c.881-.882 2.068-1.379 4-1.638C25.864 18.002 28.436 18 32 18v-2c-3.507 0-6.238-.002-8.363.284-2.153.289-3.832.89-5.147 2.206l1.414 1.414ZM32 18h1.579v-2H32v2Z"
    />
    <defs>
      <radialGradient
        id="monitor-a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(45) scale(90.5097)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" stopOpacity={0.25} />
      </radialGradient>
      <radialGradient
        id="monitor-b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(45) scale(90.5097)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={0.5} stopColor="currentColor" stopOpacity={0} />
        <stop offset={1} stopColor="currentColor" stopOpacity={0.25} />
      </radialGradient>
    </defs>
  </svg>
);
