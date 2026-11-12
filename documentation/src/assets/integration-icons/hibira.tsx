import * as React from "react";
import type { SVGProps } from "react";

const SvgHibira = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 32 32"
    fill="none"
    stroke="#e5484d"
    strokeWidth={1.7}
    strokeLinecap="round"
    {...props}
  >
    <circle cx={16} cy={16} r={2.6} fill="#e5484d" stroke="none" />
    <path d="M16 22a6 6 0 0 1 0-12" />
    <path d="M16 26a10 10 0 0 1 0-20" />
    <path d="M16 30.2a14.2 14.2 0 0 1 0-28.4" />
    <path d="M19.86 11.4a6 6 0 0 1 0 9.2" />
    <path d="M22.43 8.34a10 10 0 0 1 0 15.32" />
    <path d="M25.13 5.12a14.2 14.2 0 0 1 0 21.76" />
  </svg>
);

export default SvgHibira;
