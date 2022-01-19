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
                    <FinefoodsIcon className="w-32" />
                </div>
                <div className="flex flex-col md:flex-row gap-4 text-lg text-white font-semibold">
                    <div>
                        <Link href="/">
                            <a className="hover:underline hover:underline-offset-2 transition-all">
                                Home
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/">
                            <a className="hover:underline hover:underline-offset-2 transition-all">
                                Contact
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/">
                            <a className="hover:underline hover:underline-offset-2 transition-all">
                                Getting Started
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/">
                            <a className="hover:underline hover:underline-offset-2 transition-all">
                                Tutorials
                            </a>
                        </Link>
                    </div>
                </div>
                <RefineLoveIcon height={72} />
            </div>
        </footer>
    );
};
