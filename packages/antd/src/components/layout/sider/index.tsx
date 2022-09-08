import React, { useState } from "react";
import { Layout, Menu, Grid } from "antd";
import {
    DashboardOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
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
} from "@pankod/refine-core";

import { Title as DefaultTitle } from "@components";

import { antLayoutSider, antLayoutSiderMobile } from "./styles";
import { RefineLayoutSiderProps } from "@pankod/refine-ui-types";
const { SubMenu } = Menu;

export const Sider: React.FC<RefineLayoutSiderProps> = ({
    logout,
    dashboard,
    items,
}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const isExistAuthentication = useIsExistAuthentication();
    const { Link } = useRouterContext();
    const { mutate: mutateLogout } = useLogout();
    const Title = useTitle();
    const translate = useTranslate();
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const breakpoint = Grid.useBreakpoint();
    const { hasDashboard } = useRefineContext();

    const isMobile =
        typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

    const RenderToTitle = Title ?? DefaultTitle;

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children, parentName } = item;

            if (children.length > 0) {
                return (
                    <CanAccess
                        key={route}
                        resource={name.toLowerCase()}
                        action="list"
                        params={{
                            resource: item,
                        }}
                    >
                        <SubMenu
                            key={route}
                            icon={icon ?? <UnorderedListOutlined />}
                            title={label}
                        >
                            {renderTreeView(children, selectedKey)}
                        </SubMenu>
                    </CanAccess>
                );
            }
            const isSelected = route === selectedKey;
            const isRoute = !(
                parentName !== undefined && children.length === 0
            );
            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    <Menu.Item
                        key={route}
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
                        }}
                        icon={icon ?? (isRoute && <UnorderedListOutlined />)}
                    >
                        <Link to={route}>{label}</Link>
                        {!collapsed && isSelected && (
                            <div className="ant-menu-tree-arrow" />
                        )}
                    </Menu.Item>
                </CanAccess>
            );
        });
    };

    const defaultDashboard = hasDashboard ? (
        <CanAccess resource="dashboard" action="list">
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
        </CanAccess>
    ) : null;

    const defaultLogout = isExistAuthentication && (
        <Menu.Item
            key="logout"
            onClick={() => mutateLogout()}
            icon={<LogoutOutlined />}
        >
            {translate("buttons.logout", "Logout")}
        </Menu.Item>
    );

    const logoutButton = typeof logout !== "undefined" ? logout : defaultLogout;
    const dashboardMenuItem =
        typeof dashboard !== "undefined" ? dashboard : defaultDashboard;
    const menuItemsToRender = items ?? renderTreeView(menuItems, selectedKey);

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            collapsedWidth={isMobile ? 0 : 80}
            breakpoint="lg"
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            <RenderToTitle collapsed={collapsed} />
            <Menu
                selectedKeys={[selectedKey]}
                defaultOpenKeys={defaultOpenKeys}
                mode="inline"
                onClick={() => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }
                }}
            >
                {dashboardMenuItem}
                {menuItemsToRender}
                {logoutButton}
            </Menu>
        </Layout.Sider>
    );
};
