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

    console.log("MenuSidebarView links", links);

    return (
        <SidebarLayout handleClose={() => closeSidebar()}>
            <div className={s.root}>
                <nav>
                    <ul>
                        <li className={s.item} onClick={() => closeSidebar()}>
                            <Link href="/search">All</Link>
                        </li>
                        {links.map((l: any) => (
                            <li
                                key={l.href}
                                className={s.item}
                                onClick={() => closeSidebar()}
                            >
                                <Link href={l.href}>{l.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </SidebarLayout>
    );
}

MenuSidebarView;
