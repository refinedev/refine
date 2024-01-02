import * as React from "react";
import { SVGProps } from "react";

export const EmojiSadFace = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <g clipPath="url(#sad-face-a)">
                <path
                    fill="#FFCC4D"
                    d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
                />
                <path
                    fill="#664500"
                    d="M16.99 18.252c-.03-.119-.778-2.919-4.99-2.919s-4.96 2.8-4.99 2.92a.332.332 0 0 0 .158.369c.13.074.293.052.4-.052.013-.012 1.303-1.237 4.432-1.237 3.13 0 4.42 1.225 4.432 1.237a.335.335 0 0 0 .399.054.334.334 0 0 0 .16-.372ZM8 11.334c.92 0 1.666-1.045 1.666-2.334 0-1.288-.746-2.333-1.666-2.333-.92 0-1.667 1.045-1.667 2.333 0 1.289.746 2.334 1.667 2.334ZM16 11.334c.92 0 1.666-1.045 1.666-2.334 0-1.288-.746-2.333-1.666-2.333-.92 0-1.667 1.045-1.667 2.333 0 1.289.746 2.334 1.667 2.334Z"
                />
            </g>
            <defs>
                <clipPath id="sad-face-a">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </svg>
    );
};
