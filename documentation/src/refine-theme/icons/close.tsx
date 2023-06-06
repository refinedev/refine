import * as React from "react";
import { SVGProps } from "react";

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        {...props}
    >
        <rect
            width={24}
            height={2}
            x={0.808}
            y={17.778}
            fill="currentColor"
            rx={1}
            transform="rotate(-45 .808 17.778)"
        />
        <rect
            width={24}
            height={2}
            x={2.222}
            y={0.808}
            fill="currentColor"
            rx={1}
            transform="rotate(45 2.222 .808)"
        />
    </svg>
);
