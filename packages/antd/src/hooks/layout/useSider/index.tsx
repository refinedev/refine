import React, { useState } from "react";
import {
    useTranslate,
    useLogout,
    useTitle,
    useIsExistAuthentication,
    useRouterContext,
    useMenu,
    useRefineContext,
    useLink,
    useRouterType,
    useActiveAuthProvider,
    CanAccess,
    ITreeMenu,
    pickNotDeprecated,
} from "@refinedev/core";
import { Layout, Menu, Drawer, Button, Grid } from "antd";
import {
    DashboardOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
    BarsOutlined,
} from "@ant-design/icons";
import { RefineLayoutSiderProps } from "@refinedev/ui-types";

const { useBreakpoint } = Grid;
const { SubMenu } = Menu;

type Props = {
    meta?: RefineLayoutSiderProps["meta"];
    Title?: RefineLayoutSiderProps["Title"];
    render?: RefineLayoutSiderProps["render"];
};

export const useSider = ({ Title: TitleFromProps, render, meta }: Props) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const translate = useTranslate();

    const TitleFromContext = useTitle();
    const { hasDashboard } = useRefineContext();

    const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta });

    const routerType = useRouterType();
    const NewLink = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const Link = routerType === "legacy" ? LegacyLink : NewLink;

    const isExistAuthentication = useIsExistAuthentication();
    const authProvider = useActiveAuthProvider();
    const { mutate: mutateLogout } = useLogout({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const breakpoint = useBreakpoint();
    const isMobile =
        typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

    const RenderToTitle = TitleFromProps ?? TitleFromContext;

    const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
        return tree.map((item: ITreeMenu) => {
            const {
                icon,
                label,
                route,
                key,
                name,
                children,
                parentName,
                meta,
                options,
            } = item;

            if (children.length > 0) {
                return (
                    <CanAccess
                        key={item.key}
                        resource={name.toLowerCase()}
                        action="list"
                        params={{
                            resource: item,
                        }}
                    >
                        <SubMenu
                            key={item.key}
                            icon={icon ?? <UnorderedListOutlined />}
                            title={label}
                        >
                            {renderTreeView(children, selectedKey)}
                        </SubMenu>
                    </CanAccess>
                );
            }
            const isSelected = key === selectedKey;
            const isRoute = !(
                pickNotDeprecated(meta?.parent, options?.parent, parentName) !==
                    undefined && children.length === 0
            );

            return (
                <CanAccess
                    key={item.key}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    <Menu.Item
                        key={item.key}
                        icon={icon ?? (isRoute && <UnorderedListOutlined />)}
                    >
                        <Link to={route ?? ""}>{label}</Link>
                        {!collapsed && isSelected && (
                            <div className="ant-menu-tree-arrow" />
                        )}
                    </Menu.Item>
                </CanAccess>
            );
        });
    };

    const items = renderTreeView(menuItems, selectedKey);

    const logout = isExistAuthentication && (
        <Menu.Item
            key="logout"
            onClick={() => mutateLogout()}
            icon={<LogoutOutlined />}
        >
            {translate("buttons.logout", "Logout")}
        </Menu.Item>
    );

    const dashboard = hasDashboard ? (
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/">{translate("dashboard.title", "Dashboard")}</Link>
            {!collapsed && selectedKey === "/" && (
                <div className="ant-menu-tree-arrow" />
            )}
        </Menu.Item>
    ) : null;

    const renderSider = () => {
        if (render) {
            return render({
                dashboard,
                items,
                logout,
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

    const renderMenu = () => {
        return (
            <>
                <Menu
                    selectedKeys={selectedKey ? [selectedKey] : []}
                    defaultOpenKeys={defaultOpenKeys}
                    mode="inline"
                    style={{
                        marginTop: "8px",
                        border: "none",
                    }}
                    onClick={() => {
                        setDrawerOpen(false);
                        if (!breakpoint.lg) {
                            setCollapsed(true);
                        }
                    }}
                >
                    {renderSider()}
                </Menu>
            </>
        );
    };

    const renderDrawerSider = () => {
        return (
            <>
                <Drawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    placement="left"
                    closable={false}
                    width={200}
                    bodyStyle={{
                        padding: 0,
                    }}
                    maskClosable={true}
                >
                    <Layout>
                        <Layout.Sider
                            style={{ height: "100vh", overflow: "hidden" }}
                        >
                            {RenderToTitle && (
                                <RenderToTitle collapsed={false} />
                            )}
                            {renderMenu()}
                        </Layout.Sider>
                    </Layout>
                </Drawer>
                <Button
                    style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        position: "fixed",
                        top: 64,
                        zIndex: 999,
                    }}
                    size="large"
                    onClick={() => setDrawerOpen(true)}
                    icon={<BarsOutlined />}
                ></Button>
            </>
        );
    };

    return {
        collapsed,
        setCollapsed,
        drawerOpen,
        setDrawerOpen,
        isExistAuthentication,
        Link,
        TitleFromContext,
        translate,
        menuItems,
        selectedKey,
        defaultOpenKeys,
        hasDashboard,
        mutateLogout,
        isMobile,
        breakpoint,
        renderTreeView,
        renderMenu,
        renderDrawerSider,
        items,
    };
};
