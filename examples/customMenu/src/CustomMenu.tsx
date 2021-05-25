import React from "react";
import {
    AntdLayout,
    Menu,
    Icons,
    Link,
    useNavigation,
    useMenu,
    useLogout,
    useTitle,
} from "@pankod/refine";

export const CustomMenu: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const logout = useLogout();
    const Title = useTitle();
    const { push } = useNavigation();
    const { menuItems, selectedKey } = useMenu();

    return (
        <AntdLayout.Sider
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

                {logout && (
                    <Menu.Item
                        onClick={() => {
                            logout().then(() => push("/login"));
                        }}
                        key="logout"
                        icon={<Icons.LogoutOutlined />}
                    >
                        Logout
                    </Menu.Item>
                )}
            </Menu>
        </AntdLayout.Sider>
    );
};
