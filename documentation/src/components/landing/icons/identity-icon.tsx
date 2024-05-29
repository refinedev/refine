import clsx from "clsx";
import * as React from "react";
import type { SVGProps } from "react";

export const IdentityIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
    className={clsx(
      props.className,
      "dark:text-refine-cyan-alt text-refine-cyan",
    )}
  >
    <rect
      width={64}
      height={64}
      fill="url(#self-hosted-a)"
      fillOpacity={0.4}
      rx={16}
    />
    <rect
      width={63}
      height={63}
      x={0.5}
      y={0.5}
      stroke="url(#self-hosted-b)"
      strokeOpacity={0.5}
      rx={15.5}
    />
    <path
      fill="currentColor"
      d="M27.498 18a1 1 0 1 0-.046-2l.046 2Zm-8.372 1.17.706.71-.706-.71Zm-3.125 6.78a1 1 0 0 0 1.998.1L16 25.95ZM36.547 16a1 1 0 1 0-.045 2l.045-2Zm8.327 3.17.706-.707-.706.708ZM46 26.05a1 1 0 0 0 1.998-.1l-1.998.1ZM36.502 46a1 1 0 1 0 .045 2l-.045-2Zm8.372-1.17.706.707-.706-.708Zm3.125-6.78a1 1 0 0 0-1.998-.1l1.998.1ZM27.452 48a1 1 0 1 0 .046-2l-.046 2Zm-8.326-3.17.706-.71-.706.71ZM18 37.95a1 1 0 0 0-1.998.1l1.998-.1Zm6.528.86a1 1 0 0 0 1.446 1.38l-1.446-1.38Zm13.488 1.368a1 1 0 1 0 1.47-1.356l-1.47 1.356ZM27.452 16c-4.172.095-7.035.472-9.032 2.463l1.412 1.416c1.363-1.358 3.419-1.783 7.666-1.88L27.452 16Zm-9.032 2.463c-1.757 1.75-2.253 4.155-2.419 7.487l1.998.1c.163-3.276.65-4.991 1.833-6.17l-1.412-1.417ZM36.502 18c4.247.096 6.303.521 7.666 1.88l1.412-1.417c-1.998-1.99-4.86-2.368-9.032-2.463l-.046 2Zm7.666 1.88c1.184 1.179 1.67 2.894 1.833 6.17l1.998-.1c-.166-3.332-.662-5.736-2.42-7.487l-1.411 1.416ZM36.548 48c4.172-.095 7.034-.472 9.032-2.463l-1.412-1.416c-1.363 1.358-3.419 1.783-7.666 1.88L36.547 48Zm9.032-2.463c1.757-1.75 2.253-4.155 2.419-7.487L46 37.95c-.163 3.276-.65 4.991-1.833 6.17l1.412 1.417ZM27.498 46c-4.247-.096-6.303-.52-7.666-1.88l-1.412 1.417c1.997 1.99 4.86 2.368 9.032 2.463l.046-2Zm-7.666-1.88c-1.184-1.179-1.67-2.894-1.833-6.17l-1.998.1c.166 3.332.662 5.736 2.42 7.487l1.411-1.416Zm6.141-3.93c3.123-3.27 8.92-3.399 12.042-.012l1.47-1.356c-3.949-4.285-11.086-4.069-14.958-.013l1.446 1.382Zm8.77-11.94A2.753 2.753 0 0 1 31.987 31v2a4.753 4.753 0 0 0 4.756-4.75h-2ZM31.987 31a2.753 2.753 0 0 1-2.755-2.75h-2c0 2.625 2.13 4.75 4.755 4.75v-2Zm-2.755-2.75a2.753 2.753 0 0 1 2.755-2.75v-2a4.753 4.753 0 0 0-4.755 4.75h2Zm2.755-2.75a2.753 2.753 0 0 1 2.756 2.75h2c0-2.625-2.13-4.75-4.756-4.75v2Z"
    />
    <defs>
      <radialGradient
        id="self-hosted-a"
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
        id="self-hosted-b"
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
