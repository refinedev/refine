import Link from "next/link";
import s from "./MenuSidebarView.module.css";
import { useUI } from "@components/ui/context";
import SidebarLayout from "@components/common/SidebarLayout";
import type { Link as LinkProps } from "./index";

export default function MenuSidebarView({
    links = [],
}: {
    links?: LinkProps[];
}) {
    const { closeSidebar } = useUI();

    return (
        <SidebarLayout handleClose={() => closeSidebar()}>
            <div className={s.root}>
                <nav>
                    <ul>
                        <li className={s.item} onClick={() => closeSidebar()}>
                            <Link href="/search">
                                <a>All</a>
                            </Link>
                        </li>
                        {links.map((l: any) => (
                            <li
                                key={l.href}
                                className={s.item}
                                onClick={() => closeSidebar()}
                            >
                                <Link href={l.href}>
                                    <a>{l.label}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </SidebarLayout>
    );
}

MenuSidebarView;
