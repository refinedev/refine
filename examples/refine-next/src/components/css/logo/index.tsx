import React from "react";
import Image from "next/image";

export const Logo: React.FC = () => {
    return (
        <Image
            src="/icons/nextjs-icon.svg"
            alt="nextjs"
            width="96"
            height="58"
        />
    );
};
