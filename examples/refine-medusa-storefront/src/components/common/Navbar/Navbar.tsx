import { FC } from "react";
import Link from "next/link";
import s from "./Navbar.module.css";
import NavbarRoot from "./NavbarRoot";
import { Logo, Container } from "@components/ui";
import UserNav from "@components/common/UserNav";
import Searchbar from "@components/common/Searchbar";

interface Link {
    href: string;
    label: string;
}

interface NavbarProps {
    links?: Link[];
}

const Navbar: FC<NavbarProps> = ({ links }) => (
    <NavbarRoot>
        <Container clean className="mx-auto max-w-8xl px-6">
            <div className={s.nav}>
                <div className="flex items-center flex-1">
                    <Link href="/" className={s.logo}>
                        <Logo />
                    </Link>
                    <nav className={s.navMenu}>
                        <Link href="/search">
                            <a className={s.link}>All</a>
                        </Link>
                        {links?.map((l) => (
                            <Link href={l.href} key={l.href}>
                                <a className={s.link}>{l.label}</a>
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="justify-center flex-1 hidden lg:flex">
                    <Searchbar />
                </div>
                <div className="flex items-center justify-end flex-1 space-x-8">
                    <UserNav />
                </div>
            </div>
            <div className="flex pb-4 lg:px-6 lg:hidden">
                <Searchbar id="mobile-search" />
            </div>
        </Container>
    </NavbarRoot>
);

export default Navbar;
