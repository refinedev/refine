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
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Tooltip,
    TooltipProps,
    VStack,
} from "@chakra-ui/react";
import {
    IconList,
    IconChevronRight,
    IconChevronLeft,
    IconDashboard,
    IconLogout,
} from "@tabler/icons";

import { Title as DefaultTitle } from "../title";

const defaultNavIcon = <IconList size={18} />;

export const Sider: React.FC<RefineLayoutSiderProps> = ({ render }) => {
    const [collapsed, setCollapsed] = useState(false);

    const { Link } = useRouterContext();
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const Title = useTitle();
    const isExistAuthentication = useIsExistAuthentication();
    const t = useTranslate();
    const { hasDashboard } = useRefineContext();
    const { mutate: mutateLogout } = useLogout();

    const RenderToTitle = Title ?? DefaultTitle;

    const drawerWidth = () => {
        if (collapsed) return "80px";
        return "200px";
    };

    const commonTooltipProps: Omit<TooltipProps, "children"> = {
        placement: "right",
        hasArrow: true,
        isDisabled: !collapsed,
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
                    <Accordion
                        defaultIndex={
                            defaultOpenKeys.includes(route || "") ? 0 : -1
                        }
                        width="full"
                        allowToggle
                    >
                        <AccordionItem border="none">
                            <Tooltip label={label} {...commonTooltipProps}>
                                <AccordionButton as="div" width="full">
                                    <Button
                                        width="full"
                                        variant="link"
                                        color="white"
                                        leftIcon={
                                            icon ?? (defaultNavIcon as any)
                                        }
                                        rightIcon={
                                            isParent ? (
                                                <AccordionIcon />
                                            ) : undefined
                                        }
                                        _active={{
                                            color: "none",
                                            fontWeight: "bold",
                                        }}
                                        _hover={{ textDecoration: "none" }}
                                        isActive={isSelected}
                                        {...linkProps}
                                    >
                                        {!collapsed && (
                                            <Box flexGrow={1} textAlign="left">
                                                {label}
                                            </Box>
                                        )}
                                    </Button>
                                </AccordionButton>
                            </Tooltip>

                            {isParent && (
                                <AccordionPanel p={0} pl={collapsed ? 0 : 4}>
                                    <Accordion width="full" allowToggle>
                                        {renderTreeView(children)}
                                    </Accordion>
                                </AccordionPanel>
                            )}
                        </AccordionItem>
                    </Accordion>
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
                <Button
                    width="full"
                    justifyContent={collapsed ? "center" : "flex-start"}
                    pl={4}
                    pr={4}
                    pt={2}
                    pb={2}
                    leftIcon={<IconDashboard size={18} />}
                    variant="link"
                    color="white"
                    isActive={selectedKey === "/"}
                    _active={{ color: "none", fontWeight: "bold" }}
                    _hover={{ textDecoration: "none" }}
                    as={Link}
                    to="/"
                >
                    {!collapsed && t("dashboard.title", "Dashboard")}
                </Button>
            </Tooltip>
        </CanAccess>
    ) : null;

    const logout = isExistAuthentication && (
        <Tooltip label={t("buttons.logout", "Logout")} {...commonTooltipProps}>
            <Button
                width="full"
                justifyContent={collapsed ? "center" : "flex-start"}
                pl={4}
                pr={4}
                pt={2}
                pb={2}
                leftIcon={<IconLogout size={18} />}
                variant="link"
                _active={{ color: "none" }}
                _hover={{ textDecoration: "none" }}
                color="white"
                onClick={() => mutateLogout()}
            >
                {!collapsed && t("buttons.logout", "Logout")}
            </Button>
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
            <Box width={drawerWidth()} flexShrink={0} />
            <Box
                bg="sider.background"
                position="fixed"
                width={drawerWidth()}
                top={0}
                h="100vh"
                display="flex"
                flexDirection="column"
            >
                <Box display="flex" justifyContent="center" p={2}>
                    <RenderToTitle collapsed={collapsed} />
                </Box>
                <VStack mt={2} color="white" alignItems="start" flexGrow={1}>
                    <Box width="full">{renderSider()}</Box>
                </VStack>
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
            </Box>
        </>
    );
};
