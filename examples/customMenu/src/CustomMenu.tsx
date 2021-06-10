import React from "react";
import {
    AntdLayout,
    Menu,
    Link,
    useMenu,
    useTitle,
    Icons,
    useNavigation,
    useLogout,
} from "@pankod/refine";

export const CustomMenu: React.FC = () => {
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();
    const logout = useLogout();
    const { push } = useNavigation();

    return (
        <AntdLayout.Sider>
            <Title collapsed={false} />
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
