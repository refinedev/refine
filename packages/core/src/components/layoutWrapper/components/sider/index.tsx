import React from "react";
import { Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { useTranslate, useMenu, useLogout, useTitle } from "@hooks";

export const Sider: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const logout = useLogout();
    const Title = useTitle();
    const translate = useTranslate();
    const { menuItems, selectedKey } = useMenu();

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
        >
            <Title collapsed={collapsed} />
            <Menu
                theme="dark"
                defaultSelectedKeys={["dashboard"]}
                selectedKeys={[selectedKey]}
                mode="inline"
            >
                {menuItems &&
                    menuItems.map(({ icon, route, label }) => (
                        <Menu.Item key={route} icon={icon}>
                            <Link to={route}>{label}</Link>
                        </Menu.Item>
                    ))}

                {logout && (
                    <Menu.Item
                        onClick={() => {
                            logout();
                        }}
                        key="logout"
                        icon={<LogoutOutlined />}
                    >
                        {translate("buttons.logout", "Logout")}
                    </Menu.Item>
                )}
            </Menu>
        </Layout.Sider>
    );
};
