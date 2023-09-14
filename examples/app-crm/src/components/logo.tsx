import React from "react";

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <path
            fill="#1677FF"
            fillRule="evenodd"
            d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm3.744-18.41c.182-.647-.446-1.03-1.02-.621l-8.008 5.705c-.622.443-.524 1.326.147 1.326h2.109v-.016h4.11l-3.35 1.181-1.476 5.245c-.182.647.446 1.03 1.02.621l8.008-5.705c.622-.443.524-1.326-.147-1.326H13.94l1.805-6.41Z"
            clipRule="evenodd"
        />
    </svg>
);
