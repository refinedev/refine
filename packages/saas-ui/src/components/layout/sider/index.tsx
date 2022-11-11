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
import { RefineLayoutSiderProps } from "@pankod/refine-ui-types";
import {
    Box,
    Button,
    IconButton,
    Tooltip,
    TooltipProps,
} from "@chakra-ui/react";
import { Sidebar, SidebarSection, NavGroup, NavItem } from "@saas-ui/sidebar";
import {
    IconList,
    IconChevronRight,
    IconChevronLeft,
    IconDashboard,
    IconLogout,
    IconMenu2,
} from "@tabler/icons";

import { Title as DefaultTitle } from "../title";

const defaultNavIcon = <IconList size={20} />;

export const Sider: React.FC<RefineLayoutSiderProps> = ({ render }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [opened, setOpened] = useState(false);

    const { Link } = useRouterContext();
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const Title = useTitle();
    const isExistAuthentication = useIsExistAuthentication();
    const t = useTranslate();
    const { hasDashboard } = useRefineContext();
    const { mutate: mutateLogout } = useLogout();

    const RenderToTitle = Title ?? DefaultTitle;

    const siderWidth = () => {
        if (collapsed) return "80px";
        return "200px";
    };

    const commonTooltipProps: Omit<TooltipProps, "children"> = {
        placement: "right",
        hasArrow: true,
        isDisabled: !collapsed || opened,
    };

    const renderTreeView = (tree: ITreeMenu[]) => {
        return tree.map((item) => {
            const { label, route, name, icon, children } = item;

            const isSelected = route === selectedKey;
            const isParent = children.length > 0;

            const linkProps = !isParent
                ? {
                      as: Link,
                      to: route,
                  }
                : undefined;

            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    {isParent ? (
                        <NavGroup
                            title={label}
                            isCollapsible
                            borderRadius="0"
                            defaultIsOpen={defaultOpenKeys.includes(
                                route || "",
                            )}
                        >
                            {renderTreeView(children)}
                        </NavGroup>
                    ) : (
                        <Tooltip label={label} {...commonTooltipProps}>
                            <NavItem
                                label={label || ""}
                                icon={icon ?? (defaultNavIcon as any)}
                                isActive={isSelected}
                                py="3"
                                px="4"
                                h="12"
                                _active={{ fontWeight: "bold" }}
                                {...linkProps}
                            />
                        </Tooltip>
                    )}
                </CanAccess>
            );
        });
    };

    const items = renderTreeView(menuItems);

    const dashboard = hasDashboard ? (
        <CanAccess resource="dashboard" action="list">
            <Tooltip
                label={t("dashboard.title", "Dashboard")}
                {...commonTooltipProps}
            >
                <NavItem
                    label={t("dashboard.title", "Dashboard")}
                    as={Link}
                    to="/"
                    icon={<IconDashboard size={20} />}
                    isActive={selectedKey === "/"}
                    py="3"
                    px="4"
                    h="12"
                    fontSize="md"
                    _active={{ fontWeight: "bold" }}
                />
            </Tooltip>
        </CanAccess>
    ) : null;

    const logout = isExistAuthentication && (
        <Tooltip label={t("buttons.logout", "Logout")} {...commonTooltipProps}>
            <NavItem
                label={t("buttons.logout", "Logout")}
                icon={<IconLogout size={20} />}
                py="3"
                px="4"
                h="12"
                fontSize="md"
                _active={{ fontWeight: "bold" }}
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
                collapsed: false,
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
            <Sidebar
                bg="sider.background"
                width={siderWidth()}
                h="100vh"
                position={{ base: "fixed", lg: "sticky" }}
                zIndex="popover"
                top="0"
                variant={collapsed ? "condensed" : "default"}
                borderWidth="0"
                isOpen={collapsed || opened}
                onOpen={() => setOpened(true)}
                onClose={() => setOpened(false)}
            >
                {!collapsed && (
                    <Box
                        position={!opened ? "fixed" : "absolute"}
                        top={16}
                        left={!opened ? 0 : undefined}
                        right={opened ? -8 : undefined}
                        zIndex={1200}
                        display={{ base: "block", lg: "none" }}
                    >
                        <IconButton
                            borderLeftRadius={0}
                            bg="sider.background"
                            color="white"
                            _hover={{ bg: "sider.background" }}
                            _active={{
                                bg: "sider.background",
                                transform: "translateY(1px)",
                            }}
                            aria-label="Open Menu"
                            onClick={() => setOpened((prev) => !prev)}
                        >
                            <IconMenu2 />
                        </IconButton>
                    </Box>
                )}
                <SidebarSection pt="3">
                    <RenderToTitle collapsed={collapsed} />
                </SidebarSection>
                <SidebarSection flex={1} mt={2} px="0">
                    {renderSider()}
                </SidebarSection>
                <Button
                    onClick={() => setCollapsed((prev) => !prev)}
                    color="white"
                    bg="sider.collapseButton"
                    borderRadius={0}
                    _hover={{ bg: "sider.collapseButton" }}
                    _active={{
                        bg: "sider.collapseButton",
                        transform: "translateY(1px)",
                    }}
                >
                    {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
                </Button>
            </Sidebar>
        </>
    );
};
