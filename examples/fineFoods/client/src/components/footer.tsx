import React from "react";
import Link from "next/link";

import { MotorcycleIcon, FinefoodsIcon, RefineLoveIcon } from "@components";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-primary">
            <div className="container mx-auto my-4 flex flex-wrap items-center justify-between px-2 md:px-0">
                <div className="hidden gap-4 md:flex">
                    <MotorcycleIcon />
                    <FinefoodsIcon className="w-32" />
                </div>
                <div className="flex flex-col gap-4 text-lg font-semibold text-white md:flex-row">
                    <div>
                        <Link href="/">
                            <a className="transition-all hover:underline hover:underline-offset-2">
                                Home
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/">
                            <a className="transition-all hover:underline hover:underline-offset-2">
                                Contact
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/">
                            <a className="transition-all hover:underline hover:underline-offset-2">
                                Getting Started
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/">
                            <a className="transition-all hover:underline hover:underline-offset-2">
                                Tutorials
                            </a>
                        </Link>
                    </div>
                </div>
                <RefineLoveIcon />
            </div>
        </footer>
    );
};
