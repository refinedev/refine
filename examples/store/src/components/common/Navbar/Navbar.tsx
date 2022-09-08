import Link from "next/link";
import { Logo, Container } from "@components/ui";

import { NavbarRoot } from "./NavbarRoot";
import { UserNav, Searchbar } from "@components/common";

import s from "./Navbar.module.css";

interface Link {
    href: string;
    label: string;
}

interface NavbarProps {
    links?: { title: string; id: string }[];
}

export const Navbar: React.FC<NavbarProps> = ({ links }) => {
    return (
        <NavbarRoot>
            <Container clean className="max-w-8xl mx-auto px-6">
                <div className={s.nav}>
                    <div className="flex flex-1 items-center">
                        <Link href="/">
                            <>
                                <Logo short />
                            </>
                        </Link>
                        <nav className={s.navMenu}>
                            <Link href="/search" className={s.link}>
                                All
                            </Link>
                            {links?.map((col) => (
                                <Link
                                    href={`/search/${col.id}`}
                                    className={s.link}
                                    key={col.id}
                                >
                                    {col.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="hidden flex-1 justify-center lg:flex">
                        <Searchbar />
                    </div>
                    <div className="flex flex-1 items-center justify-end space-x-8">
                        <UserNav />
                    </div>
                </div>
                <div className="flex pb-4 lg:hidden lg:px-6">
                    <Searchbar id="mobile-search" />
                </div>
            </Container>
        </NavbarRoot>
    );
};
