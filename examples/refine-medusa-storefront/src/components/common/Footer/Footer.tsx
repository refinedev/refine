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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accent-2 py-12 text-primary bg-primary transition-colors duration-150">
                    <div className="col-span-1 lg:col-span-2">
                        <Link
                            href="/"
                            className="flex flex-initial items-center font-bold md:mr-24"
                        >
                            <>
                                <span className="rounded-full border border-accent-6 mr-2">
                                    <Logo />
                                </span>
                                <span>ACME</span>
                            </>
                        </Link>
                    </div>
                    <div className="col-span-1 lg:col-span-8">
                        <div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col">
                            {[...links].map((page) => (
                                <span
                                    key={page.url}
                                    className="py-3 md:py-0 md:pb-4"
                                >
                                    <Link
                                        href={page.url ?? ""}
                                        className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150"
                                    >
                                        {page.name}
                                    </Link>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-2 flex items-start lg:justify-end text-primary">
                        <div className="flex space-x-6 items-center h-10">
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
                <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
                    <div>
                        <span>&copy; 2020 ACME, Inc. All rights reserved.</span>
                    </div>
                    <div className="flex items-center text-primary text-sm">
                        <span className="text-primary">Created by</span>
                        <a
                            rel="noopener noreferrer"
                            href="https://vercel.com"
                            aria-label="Vercel.com Link"
                            target="_blank"
                            className="text-primary"
                        >
                            <Vercel
                                className="inline-block h-6 ml-3 text-primary"
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
