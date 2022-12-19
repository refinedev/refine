import React, { FC } from "react";

interface Props
    extends React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    > {
    className?: string;
    variant?: "blue" | "white";
}

const variantClass = {
    blue: "text-white text-center bg-gradient-to-l from-[#1890FF] to-[#47EBF5]  border-0",
    white: "text-[#1890FF] bg-white rounded-[4px] cursor-pointer border border-solid border-[#EDEDEF]",
};

const LinkButton: FC<Props> = ({
    className,
    href,
    variant = "blue",
    children,
    ...props
}) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`shadow-startTiles appearance-none flex items-center justify-center no-underline font-bold font-montserrat text-sm h-8 w-44 rounded-[4px] cursor-pointer ${variantClass[variant]} ${className}`}
            {...props}
        >
            {children}
        </a>
    );
};

export default LinkButton;
