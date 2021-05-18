import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { AuthContext } from "@contexts/auth";
import { AdminContext } from "@contexts/admin";
import { IAuthContext, IAdminContext } from "../../../../interfaces";
import { useNavigation, useTranslate, useMenu } from "@hooks";

export const Sider: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const { logout, isProvided } = useContext<IAuthContext>(AuthContext);
    const { Title } = useContext<IAdminContext>(AdminContext);
    const { push } = useNavigation();
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
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route}>{label}</Link>
                    </Menu.Item>
                ))}

                {isProvided && (
                    <Menu.Item
                        onClick={() => {
                            logout().then(() => push("/login"));
                        }}
                        key="logout"
                        icon={<LogoutOutlined />}
                    >
                        {translate("common:buttons.logout", "Logout")}
                    </Menu.Item>
                )}
            </Menu>
        </Layout.Sider>
    );
};
