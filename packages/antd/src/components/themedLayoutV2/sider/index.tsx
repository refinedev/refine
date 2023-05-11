import React from "react";
import { Layout, Menu, Grid, Drawer, Button, theme } from "antd";
import {
    DashboardOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
    BarsOutlined,
    LeftOutlined,
    RightOutlined,
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
    useWarnAboutChange,
} from "@refinedev/core";

import { drawerButtonStyles } from "./styles";
import { RefineThemedLayoutV2SiderProps } from "../types";
import { ThemedTitleV2 } from "@components";
import { useSiderVisible } from "@hooks";

const { SubMenu } = Menu;
const { useToken } = theme;

export const ThemedSiderV2: React.FC<RefineThemedLayoutV2SiderProps> = ({
    Title: TitleFromProps,
    render,
    meta,
    fixed,
}) => {
    const { token } = useToken();
    const {
        siderVisible,
        setSiderVisible,
        drawerSiderVisible,
        setDrawerSiderVisible,
    } = useSiderVisible();

    const isExistAuthentication = useIsExistAuthentication();
    const routerType = useRouterType();
    const NewLink = useLink();
    const { warnWhen, setWarnWhen } = useWarnAboutChange();
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

    const RenderToTitle = TitleFromProps ?? TitleFromContext ?? ThemedTitleV2;

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
                        {!drawerSiderVisible && isSelected && (
                            <div className="ant-menu-tree-arrow" />
                        )}
                    </Menu.Item>
                </CanAccess>
            );
        });
    };

    const handleLogout = () => {
        if (warnWhen) {
            const confirm = window.confirm(
                translate(
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
        <Menu.Item
            key="logout"
            onClick={() => handleLogout()}
            icon={<LogoutOutlined />}
        >
            {translate("buttons.logout", "Logout")}
        </Menu.Item>
    );

    const dashboard = hasDashboard ? (
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/">{translate("dashboard.title", "Dashboard")}</Link>
            {!drawerSiderVisible && selectedKey === "/" && (
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

    const renderMenu = () => {
        return (
            <Menu
                selectedKeys={selectedKey ? [selectedKey] : []}
                defaultOpenKeys={defaultOpenKeys}
                mode="inline"
                style={{
                    paddingTop: "8px",
                    border: "none",
                    overflow: "auto",
                    height: "calc(100% - 72px)",
                }}
                onClick={() => {
                    setSiderVisible?.(false);
                    if (!breakpoint.lg) {
                        setDrawerSiderVisible?.(true);
                    }
                }}
            >
                {renderSider()}
            </Menu>
        );
    };

    const renderDrawerSider = () => {
        return (
            <>
                <Drawer
                    open={siderVisible}
                    onClose={() => setSiderVisible?.(false)}
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
                            style={{
                                height: "100vh",
                                backgroundColor: token.colorBgContainer,
                                borderRight: `1px solid ${token.colorBgElevated}`,
                            }}
                        >
                            <div
                                style={{
                                    width: "200px",
                                    padding: "0 16px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    height: "64px",
                                    backgroundColor: token.colorBgElevated,
                                    borderBottom: `1px solid ${token.colorBorder}`,
                                }}
                            >
                                <RenderToTitle collapsed={false} />
                            </div>
                            {renderMenu()}
                        </Layout.Sider>
                    </Layout>
                </Drawer>
                <Button
                    style={drawerButtonStyles}
                    size="large"
                    onClick={() => setSiderVisible?.(true)}
                    icon={<BarsOutlined />}
                ></Button>
            </>
        );
    };

    if (isMobile) {
        return renderDrawerSider();
    }

    const siderStyles: React.CSSProperties = {
        backgroundColor: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBgElevated}`,
    };

    if (fixed) {
        siderStyles.position = "fixed";
        siderStyles.top = 0;
        siderStyles.height = "100vh";
        siderStyles.zIndex = 999;
    }

    return (
        <>
            {fixed && (
                <div
                    style={{
                        width: drawerSiderVisible ? "80px" : "200px",
                        transition: "all 0.2s",
                    }}
                />
            )}
            <Layout.Sider
                style={siderStyles}
                collapsible
                collapsed={drawerSiderVisible}
                onCollapse={(collapsed, type) => {
                    if (type === "clickTrigger") {
                        setDrawerSiderVisible?.(collapsed);
                    }
                }}
                collapsedWidth={80}
                breakpoint="lg"
                trigger={
                    <Button
                        type="text"
                        style={{
                            borderRadius: 0,
                            height: "100%",
                            width: "100%",
                            backgroundColor: token.colorBgElevated,
                        }}
                    >
                        {drawerSiderVisible ? (
                            <RightOutlined
                                style={{
                                    color: token.colorPrimary,
                                }}
                            />
                        ) : (
                            <LeftOutlined
                                style={{
                                    color: token.colorPrimary,
                                }}
                            />
                        )}
                    </Button>
                }
            >
                <div
                    style={{
                        width: drawerSiderVisible ? "80px" : "200px",
                        padding: drawerSiderVisible ? "0" : "0 16px",
                        display: "flex",
                        justifyContent: drawerSiderVisible
                            ? "center"
                            : "flex-start",
                        alignItems: "center",
                        height: "64px",
                        backgroundColor: token.colorBgElevated,
                        fontSize: "14px",
                        borderBottom: `1px solid ${token.colorBorder}`,
                    }}
                >
                    <RenderToTitle collapsed={drawerSiderVisible} />
                </div>
                {renderMenu()}
            </Layout.Sider>
        </>
    );
};
