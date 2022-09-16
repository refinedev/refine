import React, { useState } from "react";
import {
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useLogout,
    useMenu,
    useRefineContext,
    useRouterContext,
    useTitle,
    useTranslate,
} from "@pankod/refine-core";
import {
    ActionIcon,
    Box,
    Drawer,
    Navbar,
    NavLink,
    ScrollArea,
    MediaQuery,
    Button,
    Tooltip,
} from "@mantine/core";
import {
    IconBoxMultiple,
    IconLayoutSidebarLeftExpand,
    IconChevronRight,
    IconChevronLeft,
    IconLogout,
} from "@tabler/icons";
import { RefineLayoutSiderProps } from "@pankod/refine-ui-types";

import { Title as DefaultTitle } from "../title";

const defaultNavIcon = (
    <ActionIcon variant="transparent">
        <IconBoxMultiple color="white" size={16} stroke={1.5} />
    </ActionIcon>
);
export const Sider: React.FC<RefineLayoutSiderProps> = ({ render }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [opened, setOpened] = useState(false);

    const { Link } = useRouterContext();
    const { defaultOpenKeys, menuItems, selectedKey } = useMenu();
    const Title = useTitle();
    const isExistAuthentication = useIsExistAuthentication();
    const t = useTranslate();
    const { hasDashboard } = useRefineContext();
    const { mutate: mutateLogout } = useLogout();

    const RenderToTitle = Title ?? DefaultTitle;

    const drawerWidth = () => {
        if (collapsed) return 64;
        return 200;
    };

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item) => {
            const { icon, label, route, name, children } = item;

            const isSelected = route === selectedKey;
            const isParent = children.length > 0;

            const additionalLinkProps = isParent
                ? {}
                : { component: Link, to: route };

            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    <Tooltip
                        disabled={!collapsed}
                        label={label}
                        position="right"
                        withinPortal
                        withArrow
                        arrowSize={8}
                        arrowOffset={12}
                        offset={-30}
                    >
                        <NavLink
                            key={route}
                            label={collapsed ? "" : label}
                            icon={icon ?? defaultNavIcon}
                            active={isSelected}
                            defaultOpened={defaultOpenKeys.includes(
                                route || "",
                            )}
                            rightSection={collapsed ? <></> : ""}
                            {...additionalLinkProps}
                        >
                            {isParent && renderTreeView(children, selectedKey)}
                        </NavLink>
                    </Tooltip>
                </CanAccess>
            );
        });
    };

    const items = renderTreeView(menuItems, selectedKey);

    const dashboard = hasDashboard ? (
        <CanAccess resource="dashboard" action="list">
            <Tooltip
                disabled={!collapsed}
                label={t("dashboard.title", "Dashboard")}
                position="right"
                withinPortal
                withArrow
                arrowSize={8}
                arrowOffset={12}
                offset={-30}
            >
                <NavLink
                    key="dashboard"
                    label={collapsed ? null : t("dashboard.title", "Dashboard")}
                    icon={<IconLogout />}
                    rightSection={collapsed ? <></> : ""}
                    component={Link}
                    to="/"
                    active={selectedKey === "/"}
                />
            </Tooltip>
        </CanAccess>
    ) : null;

    const logout = isExistAuthentication && (
        <Tooltip
            disabled={!collapsed}
            label={t("buttons.logout", "Logout")}
            position="right"
            withinPortal
            withArrow
            arrowSize={8}
            arrowOffset={12}
            offset={-30}
        >
            <NavLink
                key="logout"
                label={collapsed ? null : t("buttons.logout", "Logout")}
                icon={<IconLogout />}
                rightSection={collapsed ? <></> : ""}
                onClick={() => mutateLogout()}
            />
        </Tooltip>
    );

    const renderSider = () => {
        if (render) {
            return render({
                dashboard,
                logout,
                items,
                collapsed,
            });
        }
        return (
            <>
                {dashboard}
                {items}
                {logout}
            </>
        );
    };

    return (
        <>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
                <Box sx={{ position: "fixed", top: 64, left: 0, zIndex: 1199 }}>
                    <ActionIcon
                        color="white"
                        size={36}
                        sx={{
                            borderRadius: "0 6px 6px 0",
                            backgroundColor: "#2A132E",
                            color: "white",
                            "&:hover": {},
                        }}
                        onClick={() => setOpened((prev) => !prev)}
                    >
                        <IconLayoutSidebarLeftExpand />
                    </ActionIcon>
                </Box>
            </MediaQuery>

            <MediaQuery largerThan="md" styles={{ display: "none" }}>
                <Drawer
                    opened={opened}
                    onClose={() => setOpened(false)}
                    size={200}
                    zIndex={1200}
                    withCloseButton={false}
                    styles={{
                        drawer: {
                            overflow: "hidden",
                            backgroundColor: "#2A132E",
                        },
                    }}
                >
                    <Navbar.Section px="xs">
                        <RenderToTitle collapsed={false} />
                    </Navbar.Section>
                    <Navbar.Section
                        grow
                        component={ScrollArea}
                        mx="-xs"
                        px="xs"
                    >
                        {renderSider()}
                    </Navbar.Section>
                </Drawer>
            </MediaQuery>

            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                <Box
                    sx={{
                        width: drawerWidth(),
                        transition: "width 1000ms ease, min-width 1000ms ease",
                    }}
                />
            </MediaQuery>

            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                <Navbar
                    width={{ base: drawerWidth() }}
                    sx={{
                        overflow: "hidden",
                        transition: "width 1000ms ease, min-width 1000ms ease",
                        backgroundColor: "#2A132E",
                        position: "fixed",
                    }}
                >
                    <Navbar.Section px="xs">
                        <RenderToTitle collapsed={collapsed} />
                    </Navbar.Section>
                    <Navbar.Section
                        grow
                        mt="sm"
                        component={ScrollArea}
                        mx="-xs"
                        px="xs"
                    >
                        {renderSider()}
                    </Navbar.Section>
                    <Navbar.Section>
                        <Button
                            sx={{
                                background: "rgba(0,0,0,.5)",
                                borderRadius: 0,
                                borderTop: "1px solid #ffffff1a",
                            }}
                            size="md"
                            variant="gradient"
                            fullWidth
                            onClick={() => setCollapsed((prev) => !prev)}
                        >
                            {collapsed ? (
                                <IconChevronRight />
                            ) : (
                                <IconChevronLeft />
                            )}
                        </Button>
                    </Navbar.Section>
                </Navbar>
            </MediaQuery>
        </>
    );
};
