import * as React from "react";
import { SVGProps } from "react";

export const EmojiNeutralFace = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <g clipPath="url(#neutral-face-a)">
                <path
                    fill="#FFCC4D"
                    d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Z"
                />
                <path
                    fill="#664500"
                    d="M7.667 13.334c.92 0 1.666-1.045 1.666-2.334 0-1.288-.746-2.333-1.666-2.333C6.747 8.667 6 9.712 6 11c0 1.289.746 2.334 1.667 2.334ZM16.334 13.334c.92 0 1.666-1.045 1.666-2.334 0-1.288-.746-2.333-1.666-2.333-.92 0-1.667 1.045-1.667 2.333 0 1.289.746 2.334 1.667 2.334ZM16.667 17.333H7.334a.666.666 0 1 1 0-1.333h9.333a.666.666 0 1 1 0 1.333Z"
                />
            </g>
            <defs>
                <clipPath id="neutral-face-a">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </svg>
    );
};
