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
                        <Link href="https://refine.dev/docs/getting-started/overview/">
                            <a className="transition-all hover:underline hover:underline-offset-2">
                                Quickstart
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="https://refine.dev/docs/">
                            <a className="transition-all hover:underline hover:underline-offset-2">
                                Tutorials
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="https://refine.dev/docs/examples/">
                            <a className="transition-all hover:underline hover:underline-offset-2">
                                Examples
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="https://refine.dev/blog/">
                            <a className="transition-all hover:underline hover:underline-offset-2">
                                Blog
                            </a>
                        </Link>
                    </div>
                </div>
                <RefineLoveIcon />
            </div>
        </footer>
    );
};
