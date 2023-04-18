import React from "react";
import {
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useLink,
    useLogout,
    useMenu,
    useActiveAuthProvider,
    useRefineContext,
    useRouterContext,
    useRouterType,
    useTitle,
    useTranslate,
    useWarnAboutChange,
} from "@refinedev/core";
import {
    Box,
    Drawer,
    Navbar,
    NavLink,
    NavLinkStylesNames,
    NavLinkStylesParams,
    ScrollArea,
    MediaQuery,
    Tooltip,
    TooltipProps,
    Styles,
    useMantineTheme,
    Flex,
} from "@mantine/core";
import { IconList, IconPower, IconDashboard } from "@tabler/icons";

import { ThemedTitleV2 as DefaultTitle } from "@components";
import { useSiderVisible } from "@hooks";

import { RefineThemedLayoutV2SiderProps } from "../types";

const defaultNavIcon = <IconList size={20} />;

export const ThemedSiderV2: React.FC<RefineThemedLayoutV2SiderProps> = ({
    render,
    meta,
    Title: TitleFromProps,
}) => {
    const theme = useMantineTheme();
    const { siderVisible, setSiderVisible, drawerSiderVisible } =
        useSiderVisible();

    const routerType = useRouterType();
    const NewLink = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const Link = routerType === "legacy" ? LegacyLink : NewLink;

    const { defaultOpenKeys, menuItems, selectedKey } = useMenu({ meta });
    const TitleFromContext = useTitle();
    const isExistAuthentication = useIsExistAuthentication();
    const t = useTranslate();
    const { hasDashboard } = useRefineContext();
    const authProvider = useActiveAuthProvider();
    const { warnWhen, setWarnWhen } = useWarnAboutChange();
    const { mutate: mutateLogout } = useLogout({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle;

    const drawerWidth = () => {
        if (drawerSiderVisible) return 80;
        return 200;
    };

    const borderColor =
        theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2];

    const commonNavLinkStyles: Styles<NavLinkStylesNames, NavLinkStylesParams> =
        {
            root: {
                display: "flex",
                marginTop: "12px",
                justifyContent:
                    drawerSiderVisible && !siderVisible
                        ? "center"
                        : "flex-start",
            },
            icon: {
                marginRight: drawerSiderVisible && !siderVisible ? 0 : 12,
            },
            body: {
                display: drawerSiderVisible && !siderVisible ? "none" : "flex",
            },
        };

    const commonTooltipProps: Partial<TooltipProps> = {
        disabled: !drawerSiderVisible || siderVisible,
        position: "right",
        withinPortal: true,
        withArrow: true,
        arrowSize: 8,
        arrowOffset: 12,
        offset: 4,
    };

    const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
        return tree.map((item) => {
            const { icon, label, route, name, children } = item;

            const isSelected = item.key === selectedKey;
            const isParent = children.length > 0;

            const additionalLinkProps = isParent
                ? {}
                : { component: Link as any, to: route };

            return (
                <CanAccess
                    key={item.key}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    <Tooltip label={label} {...commonTooltipProps}>
                        <NavLink
                            key={item.key}
                            label={
                                drawerSiderVisible && !siderVisible
                                    ? null
                                    : label
                            }
                            icon={icon ?? defaultNavIcon}
                            active={isSelected}
                            childrenOffset={
                                drawerSiderVisible && !siderVisible ? 0 : 12
                            }
                            defaultOpened={defaultOpenKeys.includes(
                                item.key || "",
                            )}
                            pl={
                                drawerSiderVisible || siderVisible
                                    ? "12px"
                                    : "18px"
                            }
                            styles={commonNavLinkStyles}
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
                label={t("dashboard.title", "Dashboard")}
                {...commonTooltipProps}
            >
                <NavLink
                    key="dashboard"
                    label={
                        drawerSiderVisible && !siderVisible
                            ? null
                            : t("dashboard.title", "Dashboard")
                    }
                    icon={<IconDashboard size={20} />}
                    component={Link as any}
                    to="/"
                    active={selectedKey === "/"}
                    styles={commonNavLinkStyles}
                />
            </Tooltip>
        </CanAccess>
    ) : null;

    const handleLogout = () => {
        if (warnWhen) {
            const confirm = window.confirm(
                t(
                    "warnWhenUnsavedChanges",
                    "Are you sure you want to leave? You have unsaved changes.",
                ),
            );

            if (confirm) {
                setWarnWhen(false);
                mutateLogout();
            }
        } else {
            mutateLogout();
        }
    };

    const logout = isExistAuthentication && (
        <Tooltip label={t("buttons.logout", "Logout")} {...commonTooltipProps}>
            <NavLink
                key="logout"
                label={
                    drawerSiderVisible && !siderVisible
                        ? null
                        : t("buttons.logout", "Logout")
                }
                icon={<IconPower size={20} />}
                pl={drawerSiderVisible || siderVisible ? "12px" : "18px"}
                onClick={handleLogout}
                styles={commonNavLinkStyles}
            />
        </Tooltip>
    );

    const renderSider = () => {
        if (render) {
            return render({
                dashboard,
                logout,
                items,
                collapsed: drawerSiderVisible,
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
                <Drawer
                    opened={siderVisible}
                    onClose={() => setSiderVisible?.(false)}
                    size={200}
                    zIndex={1200}
                    withCloseButton={false}
                    styles={{
                        drawer: {
                            overflow: "hidden",
                        },
                    }}
                >
                    <Navbar.Section
                        pl={8}
                        sx={{
                            height: "64px",
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "10px",
                            borderBottom: `1px solid ${borderColor}`,
                        }}
                    >
                        <RenderToTitle collapsed={false} />
                    </Navbar.Section>
                    <Navbar.Section
                        component={ScrollArea}
                        grow
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
                        transition: "width 200ms ease, min-width 200ms ease",
                        flexShrink: 0,
                    }}
                />
            </MediaQuery>

            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                <Navbar
                    width={{ base: drawerWidth() }}
                    sx={{
                        overflow: "hidden",
                        transition: "width 200ms ease, min-width 200ms ease",
                        position: "fixed",
                        top: 0,
                        height: "100vh",
                        borderRight: 0,
                        zIndex: 199,
                    }}
                >
                    <Flex
                        h="64px"
                        pl={drawerSiderVisible ? 0 : "16px"}
                        align="center"
                        justify={drawerSiderVisible ? "center" : "flex-start"}
                        sx={{
                            borderBottom: `1px solid ${borderColor}`,
                        }}
                    >
                        <RenderToTitle collapsed={drawerSiderVisible} />
                    </Flex>
                    <Navbar.Section
                        grow
                        component={ScrollArea}
                        mx="-xs"
                        px="xs"
                        sx={{
                            ".mantine-ScrollArea-viewport": {
                                borderRight: `1px solid ${borderColor}`,
                                borderBottom: `1px solid ${borderColor}`,
                            },
                        }}
                    >
                        {renderSider()}
                    </Navbar.Section>
                </Navbar>
            </MediaQuery>
        </>
    );
};
