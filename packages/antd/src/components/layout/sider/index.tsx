import React, { useState } from "react";
import { Layout, Menu, Grid } from "antd";
import { RightOutlined, LogoutOutlined } from "@ant-design/icons";
import {
    useTranslate,
    useLogout,
    useTitle,
    useNavigation,
    CanAccess,
    useIsExistAuthentication,
} from "@pankod/refine-core";

import { Title as DefaultTitle } from "@components";

import { useMenu } from "@hooks";

import { antLayoutSider, antLayoutSiderMobile } from "./styles";

export const Sider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const isExistAuthentication = useIsExistAuthentication();
    const { mutate: logout } = useLogout();
    const Title = useTitle();
    const translate = useTranslate();
    const { menuItems, selectedKey } = useMenu();
    const { push } = useNavigation();
    const breakpoint = Grid.useBreakpoint();

    const isMobile = !breakpoint.lg;

    const RenderToTitle = Title ?? DefaultTitle;

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
                mode="inline"
                onClick={({ key }) => {
                    if (key === "logout") {
                        logout();
                        return;
                    }

                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }

                    push(key as string);
                }}
            >
                {menuItems.map(({ icon, label, route, name }) => {
                    const isSelected = route === selectedKey;
                    return (
                        <CanAccess
                            key={route}
                            resource={name.toLowerCase()}
                            action="list"
                        >
                            <Menu.Item
                                style={{
                                    fontWeight: isSelected ? "bold" : "normal",
                                }}
                                icon={icon}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    {label}
                                    {!collapsed && isSelected && (
                                        <RightOutlined />
                                    )}
                                </div>
                            </Menu.Item>
                        </CanAccess>
                    );
                })}

                {isExistAuthentication && (
                    <Menu.Item key="logout" icon={<LogoutOutlined />}>
                        {translate("buttons.logout", "Logout")}
                    </Menu.Item>
                )}
            </Menu>
        </Layout.Sider>
    );
};
