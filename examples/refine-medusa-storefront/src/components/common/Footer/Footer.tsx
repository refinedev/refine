import { FC } from "react";
import cn from "clsx";
import Link from "next/link";
// import type { Page } from "@commerce/types/page";
// import getSlug from "@lib/get-slug";
import { Github, Vercel } from "@components/icons";
import { Logo, Container } from "@components/ui";
// import { I18nWidget } from "@components/common";
import s from "./Footer.module.css";
// import { useResource } from "@pankod/refine-core";

interface Props {
    className?: string;
    children?: any;
    pages?: any[];
}

const links = [
    {
        name: "Home",
        url: "/",
    },
];

const Footer: FC<Props> = ({ className, pages }) => {
    const rootClassName = cn(s.root, className);

    return (
        <footer className={rootClassName}>
            <Container>
                <div className="border-accent-2 text-primary bg-primary grid grid-cols-1 gap-8 border-b py-12 transition-colors duration-150 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-2">
                        <Link
                            href="/"
                            className="flex flex-initial items-center font-bold md:mr-24"
                        >
                            <>
                                <span className="border-accent-6 mr-2 rounded-full border">
                                    <Logo />
                                </span>
                                <span>ACME</span>
                            </>
                        </Link>
                    </div>
                    <div className="col-span-1 lg:col-span-8">
                        <div className="grid md:grid-flow-col md:grid-cols-3 md:grid-rows-4">
                            {[...links].map((page) => (
                                <span
                                    key={page.url}
                                    className="py-3 md:py-0 md:pb-4"
                                >
                                    <Link
                                        href={page.url ?? ""}
                                        className="text-accent-9 hover:text-accent-6 transition duration-150 ease-in-out"
                                    >
                                        {page.name}
                                    </Link>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="text-primary col-span-1 flex items-start lg:col-span-2 lg:justify-end">
                        <div className="flex h-10 items-center space-x-6">
                            <a
                                // className={s.link}
                                aria-label="Github Repository"
                                href="https://github.com/vercel/commerce"
                            >
                                <Github />
                            </a>
                            {/* // i18n */}
                        </div>
                    </div>
                </div>
                <div className="text-accent-6 flex flex-col items-center justify-between space-y-4 pt-6 pb-10 text-sm md:flex-row">
                    <div>
                        <span>&copy; 2020 ACME, Inc. All rights reserved.</span>
                    </div>
                    <div className="text-primary flex items-center text-sm">
                        <span className="text-primary">Created by</span>
                        <a
                            rel="noopener noreferrer"
                            href="https://vercel.com"
                            aria-label="Vercel.com Link"
                            target="_blank"
                            className="text-primary"
                        >
                            <Vercel
                                className="text-primary ml-3 inline-block h-6"
                                alt="Vercel.com Logo"
                            />
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
