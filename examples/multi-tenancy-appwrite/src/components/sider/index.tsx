import React, { useState } from "react";
import {
    ITreeMenu,
    CanAccess,
    useLogout,
    useIsExistAuthentication,
    useMenu,
    useWarnAboutChange,
} from "@refinedev/core";
import {
    UnorderedListOutlined,
    LogoutOutlined,
    AppstoreAddOutlined,
    LeftOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { Layout as AntdLayout, Menu, Grid, theme, Button } from "antd";
import { Link } from "react-router-dom";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

import { StoreSelect } from "components/select";
import { ThemedTitle } from "@refinedev/antd";

const { useToken } = theme;

export const CustomSider: React.FC = () => {
    const { token } = useToken();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { SubMenu } = Menu;
    const { menuItems, selectedKey } = useMenu();
    const breakpoint = Grid.useBreakpoint();
    const { warnWhen, setWarnWhen } = useWarnAboutChange();
    const { mutate: mutateLogout } = useLogout();
    const isExistAuthentication = useIsExistAuthentication();

    const isMobile =
        typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { name, children, meta, key, list } = item;

            const icon = meta?.icon;
            const label = meta?.label ?? name;
            const parent = meta?.parent;
            const route =
                typeof list === "string"
                    ? list
                    : typeof list !== "function"
                    ? list?.path
                    : key;

            if (children.length > 0) {
                return (
                    <SubMenu
                        key={route}
                        icon={icon ?? <UnorderedListOutlined />}
                        title={label}
                    >
                        {renderTreeView(children, selectedKey)}
                    </SubMenu>
                );
            }
            const isSelected = route === selectedKey;
            const isRoute = !(parent !== undefined && children.length === 0);
            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{ resource: item }}
                >
                    <Menu.Item
                        key={route}
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
                        }}
                        icon={icon ?? (isRoute && <UnorderedListOutlined />)}
                    >
                        <Link to={route || "/"}>{label}</Link>
                        {!collapsed && isSelected && (
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
                "Are you sure you want to leave? You have unsaved changes.",
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
            onClick={handleLogout}
            icon={<LogoutOutlined />}
        >
            Logout
        </Menu.Item>
    );

    const siderStyle = isMobile ? antLayoutSiderMobile : antLayoutSider;

    return (
        <AntdLayout.Sider
            collapsible
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            style={{
                ...siderStyle,
                backgroundColor: token.colorBgContainer,
                borderRight: `1px solid ${token.colorBgElevated}`,
            }}
            trigger={
                !isMobile && (
                    <Button
                        type="text"
                        style={{
                            borderRadius: 0,
                            height: "100%",
                            width: "100%",
                            backgroundColor: token.colorBgElevated,
                        }}
                    >
                        {collapsed ? (
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
                )
            }
        >
            <div
                style={{
                    width: collapsed ? "80px" : "200px",
                    padding: collapsed ? "0" : "0 16px",
                    display: "flex",
                    justifyContent: collapsed ? "center" : "flex-start",
                    alignItems: "center",
                    height: "64px",
                    backgroundColor: token.colorBgElevated,
                    fontSize: "14px",
                }}
            >
                <ThemedTitle collapsed={collapsed} />
            </div>
            <Menu
                selectedKeys={[selectedKey]}
                mode="inline"
                style={{
                    border: "none",
                }}
                onClick={() => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }
                }}
            >
                <Menu.Item key={"/"} icon={<AppstoreAddOutlined />}>
                    <StoreSelect />
                </Menu.Item>
                {renderTreeView(menuItems, selectedKey)}
                {logout}
            </Menu>
        </AntdLayout.Sider>
    );
};
