import React, { useState, useContext } from "react";
import { Layout, Menu, Grid } from "antd";
import { RightOutlined, LogoutOutlined } from "@ant-design/icons";

import {
    useTranslate,
    useMenu,
    useLogout,
    useTitle,
    useNavigation,
} from "@hooks";
import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../../interfaces";

export const Sider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { isProvided } = useContext<IAuthContext>(AuthContext);
    const { mutate: logout } = useLogout();
    const Title = useTitle();
    const translate = useTranslate();
    const { menuItems, selectedKey } = useMenu();
    const { push } = useNavigation();
    const breakpoint = Grid.useBreakpoint();

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            collapsedWidth={!breakpoint.lg ? 0 : 80}
            breakpoint="lg"
        >
            <Title collapsed={collapsed} />
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
                {menuItems.map(({ icon, label, route }) => {
                    const isSelected = route === selectedKey;
                    return (
                        <Menu.Item
                            style={{
                                fontWeight: isSelected ? "bold" : "normal",
                            }}
                            key={route}
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
                                {isSelected && <RightOutlined />}
                            </div>
                        </Menu.Item>
                    );
                })}

                {isProvided && (
                    <Menu.Item key="logout" icon={<LogoutOutlined />}>
                        {translate("buttons.logout", "Logout")}
                    </Menu.Item>
                )}
            </Menu>
        </Layout.Sider>
    );
};
