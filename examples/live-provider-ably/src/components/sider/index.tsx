import React, { useState } from "react";
import {
    useSubscription,
    CanAccess,
    ITreeMenu,
    useMenu,
} from "@refinedev/core";
import { Link } from "react-router-dom";
import {
    UnorderedListOutlined,
    LeftOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { Layout as AntdLayout, Menu, Grid, Badge, theme, Button } from "antd";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";
import { ThemedTitle } from "@refinedev/antd";

const { useToken } = theme;

export const CustomSider: React.FC = () => {
    const { token } = useToken();
    const [subscriptionCount, setSubscriptionCount] = useState(0);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { SubMenu } = Menu;

    const { menuItems, selectedKey } = useMenu();
    const breakpoint = Grid.useBreakpoint();

    const isMobile =
        typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

    useSubscription({
        channel: "resources/posts",
        types: ["created", "updated"],
        onLiveEvent: () => setSubscriptionCount((prev) => prev + 1),
    });

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { name, children, meta, key, list } = item;

            const icon = meta?.icon;
            const label = meta?.label ?? name;
            const parent = meta?.parent;
            const route = key;
            const to =
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
                        icon={icon ?? (isRoute && <UnorderedListOutlined />)}
                        style={{
                            textTransform: "capitalize",
                        }}
                    >
                        <Link to={to || "/"}>{label}</Link>
                        {label === "Posts" && (
                            <Badge
                                size="small"
                                count={subscriptionCount}
                                offset={[2, -15]}
                            />
                        )}
                        {!collapsed && isSelected && (
                            <div className="ant-menu-tree-arrow" />
                        )}
                    </Menu.Item>
                </CanAccess>
            );
        });
    };

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
                    marginTop: "8px",
                    border: "none",
                }}
                onClick={({ key }) => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }

                    if (key === "/posts") {
                        setSubscriptionCount(0);
                    }
                }}
            >
                {renderTreeView(menuItems, selectedKey)}
            </Menu>
        </AntdLayout.Sider>
    );
};
