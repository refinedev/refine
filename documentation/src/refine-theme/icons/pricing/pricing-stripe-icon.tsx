import * as React from "react";
import type { SVGProps } from "react";
const SvgPricingStripeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {props.name && <title>{props.name}</title>}
        <rect width={24} height={24} rx={4} fill="#635BFF" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.0581 9.33039C11.0581 8.76639 11.5201 8.54439 12.2881 8.54439C13.3921 8.54439 14.7841 8.88039 15.8881 9.47439V6.06639C14.6821 5.58639 13.4941 5.40039 12.2941 5.40039C9.34809 5.40039 7.39209 6.93639 7.39209 9.50439C7.39209 13.5064 12.9061 12.8704 12.9061 14.5984C12.9061 15.2644 12.3241 15.4804 11.5141 15.4804C10.3081 15.4804 8.77209 14.9884 7.55409 14.3224V17.7724C8.90409 18.3544 10.2661 18.6004 11.5141 18.6004C14.5321 18.6004 16.6081 17.1064 16.6081 14.5084C16.5841 10.1884 11.0581 10.9564 11.0581 9.33039Z"
            fill="white"
        />
    </svg>
);
export default SvgPricingStripeIcon;
