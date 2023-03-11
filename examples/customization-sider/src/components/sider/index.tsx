import React, { CSSProperties, useState } from "react";
import { Layout, Menu, Grid, ConfigProvider, Drawer, Button } from "antd";
import {
    DashboardOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
    BarsOutlined,
} from "@ant-design/icons";
import {
    useTranslate,
    useLogout,
    useTitle,
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useRouterContext,
    useMenu,
    useRefineContext,
    useLink,
    useRouterType,
    useActiveAuthProvider,
    pickNotDeprecated,
} from "@refinedev/core";
import { RefineLayoutSiderProps, Title as DefaultTitle } from "@refinedev/antd";

const drawerButtonStyles: CSSProperties = {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    position: "fixed",
    top: 64,
    zIndex: 999,
};

const { SubMenu } = Menu;

export const CustomSider: React.FC<RefineLayoutSiderProps> = ({
    Title: TitleFromProps,
    render,
    meta,
}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const isExistAuthentication = useIsExistAuthentication();
    const routerType = useRouterType();
    const NewLink = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const Link = routerType === "legacy" ? LegacyLink : NewLink;
    const TitleFromContext = useTitle();
    const translate = useTranslate();
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta });
    const breakpoint = Grid.useBreakpoint();
    const { hasDashboard } = useRefineContext();
    const authProvider = useActiveAuthProvider();
    const { mutate: mutateLogout } = useLogout({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const isMobile =
        typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

    const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle;

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
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
                        }}
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
        <Menu.Item
            key="dashboard"
            style={{
                fontWeight: selectedKey === "/" ? "bold" : "normal",
            }}
            icon={<DashboardOutlined />}
        >
            <Link to="/">{translate("dashboard.title", "Dashboard")}</Link>
            {!collapsed && selectedKey === "/" && (
                <div className="ant-menu-tree-arrow" />
            )}
        </Menu.Item>
    ) : null;

    const items = renderTreeView(menuItems, selectedKey);

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
                    theme="dark"
                    selectedKeys={selectedKey ? [selectedKey] : []}
                    defaultOpenKeys={defaultOpenKeys}
                    mode="inline"
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
                            <RenderToTitle collapsed={false} />
                            {renderMenu()}
                        </Layout.Sider>
                    </Layout>
                </Drawer>
                <Button
                    style={drawerButtonStyles}
                    size="large"
                    onClick={() => setDrawerOpen(true)}
                    icon={<BarsOutlined />}
                ></Button>
            </>
        );
    };

    const renderContent = () => {
        if (isMobile) {
            return renderDrawerSider();
        }

        return (
            <Layout.Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(collapsed: boolean): void =>
                    setCollapsed(collapsed)
                }
                collapsedWidth={80}
                breakpoint="lg"
            >
                <RenderToTitle collapsed={collapsed} />
                {renderMenu()}
            </Layout.Sider>
        );
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        colorItemBg: "transparent",
                        colorItemText: "#fff",
                        colorItemTextSelected: "#fff",
                        colorItemBgSelected: "transparent",
                        colorItemTextHover: "#fff",
                    },
                },
            }}
        >
            {renderContent()}
        </ConfigProvider>
    );
};
