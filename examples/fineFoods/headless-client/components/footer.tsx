import React from "react";
import Link from "next/link";

import {
    MotorcycleIcon,
    FinefoodsIcon,
    RefineLoveIcon,
} from "../components/icons";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-primary">
            <div className="container flex flex-wrap justify-between items-center mx-auto my-4 px-2 md:px-0">
                <div className="hidden md:flex gap-4">
                    <MotorcycleIcon />
                    <FinefoodsIcon width={200} />
                </div>
                <div className="grid grid-flow-row md:grid-flow-col auto-cols-max gap-4 text-lg text-white font-semibold">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/">
                        <a>Contact</a>
                    </Link>
                    <Link href="/">
                        <a>Getting Started</a>
                    </Link>
                    <Link href="/">
                        <a>Tutorials</a>
                    </Link>
                </div>
                <RefineLoveIcon height={72} />
            </div>
        </footer>
    );
};
