import cn from "clsx";
import { useRouter } from "next/router";
import { useLogout } from "@refinedev/core";

import {
    DropdownContent,
    DropdownMenuItem,
    DropdownMenuPortal,
} from "@components/ui";

import s from "./CustomerMenuContent.module.css";

const LINKS = [
    {
        name: "My Account",
        href: "/account",
    },
    {
        name: "My Orders",
        href: "/account/orders",
    },
    {
        name: "My Profile",
        href: "/account/profile",
    },
    {
        name: "My Addresses",
        href: "/account/addresses",
    },
];

export const CustomerMenuContent: React.FC = () => {
    const router = useRouter();
    router.beforePopState;
    const { pathname } = useRouter();

    const { mutate: logout } = useLogout<{ redirectTo: string }>();

    function handleClick(_: React.MouseEvent<HTMLAnchorElement>, href: string) {
        _.preventDefault();
        router.push(href);
    }

    return (
        <DropdownMenuPortal>
            <DropdownContent
                asChild
                side="bottom"
                sideOffset={10}
                className={s.root}
                id="CustomerMenuContent"
            >
                {LINKS.map(({ name, href }) => (
                    <DropdownMenuItem key={href}>
                        <a
                            className={cn(s.link, {
                                [s.active]: pathname === href,
                            })}
                            onClick={(e) => handleClick(e, href)}
                        >
                            {name}
                        </a>
                    </DropdownMenuItem>
                ))}
                {/* TODO: uncomment dark mode when theme is ready */}
                {/* <DropdownMenuItem>
                <a
                    className={cn(s.link, "justify-between")}
                    onClick={() => {
                        setTheme(theme === "dark" ? "light" : "dark");
                    }}
                >
                    <div>
                        Theme: <strong>{theme}</strong>{" "}
                    </div>
                    <div className="ml-3">
                        {theme == "dark" ? (
                            <Moon width={20} height={20} />
                        ) : (
                            <Sun width={20} height={20} />
                        )}
                    </div>
                </a>
            </DropdownMenuItem> */}
                <DropdownMenuItem>
                    <a
                        className={cn(s.link, "border-accent-2 mt-4 border-t")}
                        onClick={() =>
                            logout({
                                redirectTo: "/",
                            })
                        }
                    >
                        Logout
                    </a>
                </DropdownMenuItem>
            </DropdownContent>
        </DropdownMenuPortal>
    );
};
