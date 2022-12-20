import React, { FC } from "react";

interface Props
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    className?: string;
    variant?: "blue" | "white";
}

const variantClass = {
    blue: "text-white text-center bg-gradient-to-l from-[#1890FF] to-[#47EBF5]  border-0",
    white: "text-[#1890FF] bg-white rounded-[4px] cursor-pointer border border-solid border-[#EDEDEF]",
};

const GradientButton: FC<Props> = ({
    className,
    variant = "blue",
    children,
    ...props
}) => {
    return (
        <button
            className={`shadow-startTiles appearance-none flex items-center justify-center no-underline font-bold font-montserrat text-sm h-8 w-44 rounded-[4px] cursor-pointer ${variantClass[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default GradientButton;
