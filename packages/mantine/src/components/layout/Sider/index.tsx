import React, { FC } from "react";
import {
    useIsExistAuthentication,
    useLogout,
    useMenu,
    useRouterContext,
    useTranslate,
} from "@pankod/refine-core";
import { Button, Navbar, NavLink, ScrollArea } from "@mantine/core";

interface ISider {
    opened: boolean;
}

export const Sider: FC<ISider> = ({ opened }) => {
    const { Link } = useRouterContext();

    const { menuItems, selectedKey } = useMenu();

    const t = useTranslate();

    const isExistAuthentication = useIsExistAuthentication();
    const { mutate: logout } = useLogout();

    return (
        <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ lg: 200 }}
        >
            <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                {menuItems.map((item) => {
                    const active = selectedKey === item.key;

                    if (!!item.children.length) {
                        return (
                            <NavLink key={item.key} label={item.label}>
                                {item.children.map((child) => {
                                    return (
                                        <NavLink
                                            key={child.key}
                                            component={Link}
                                            to={child.key}
                                            label={child.label}
                                            icon={child.icon}
                                            active={active}
                                            variant="subtle"
                                        />
                                    );
                                })}
                            </NavLink>
                        );
                    }

                    return (
                        <NavLink
                            component={Link}
                            key={item.key}
                            to={item.key}
                            label={item.label}
                            icon={item.icon}
                            active={active}
                            variant="subtle"
                        />
                    );
                })}
            </Navbar.Section>

            {isExistAuthentication && (
                <Button
                    variant="subtle"
                    onClick={() => logout()}
                    sx={{
                        marginTop: "auto",
                    }}
                >
                    {t("buttons.logout", "Logout")}
                </Button>
            )}
        </Navbar>
    );
};
