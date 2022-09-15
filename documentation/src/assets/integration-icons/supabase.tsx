import * as React from "react";
import { SVGProps } from "react";

const SvgSupabase = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={47}
        height={48}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M27.31 47.203c-1.227 1.544-3.713.698-3.743-1.274l-.432-28.84h19.392c3.512 0 5.471 4.058 3.287 6.808L27.309 47.203Z"
            fill="url(#supabase_svg__a)"
        />
        <path
            d="M27.31 47.203c-1.227 1.544-3.713.698-3.743-1.274l-.432-28.84h19.392c3.512 0 5.471 4.058 3.287 6.808L27.309 47.203Z"
            fill="url(#supabase_svg__b)"
            fillOpacity={0.2}
        />
        <path
            d="M19.423.798c1.226-1.545 3.712-.699 3.742 1.273l.19 28.84H4.204c-3.512 0-5.471-4.057-3.287-6.808L19.423.798Z"
            fill="#3ECF8E"
        />
        <defs>
            <linearGradient
                id="supabase_svg__a"
                x1={23.135}
                y1={23.484}
                x2={40.37}
                y2={30.712}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#249361" />
                <stop offset={1} stopColor="#3ECF8E" />
            </linearGradient>
            <linearGradient
                id="supabase_svg__b"
                x1={15.494}
                y1={13.023}
                x2={23.354}
                y2={27.818}
                gradientUnits="userSpaceOnUse"
            >
                <stop />
                <stop offset={1} stopOpacity={0} />
            </linearGradient>
        </defs>
    </svg>
);

export default SvgSupabase;
