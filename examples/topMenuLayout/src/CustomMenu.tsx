import React from "react";
import {
    Link,
    Menu,
    useMenu,
    useNavigation,
    useTranslate,
    useLogout,
    useTitle,
    Icons,
} from "@pankod/refine";

export const CustomMenu: React.FC = () => {
    const logout = useLogout();
    const Title = useTitle();
    const { push } = useNavigation();
    const translate = useTranslate();
    const { menuItems, selectedKey } = useMenu();

    return (
        <>
            <Title collapsed={false} />
            <Menu
                theme="dark"
                defaultSelectedKeys={["dashboard"]}
                selectedKeys={[selectedKey]}
                mode="horizontal"
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
                        {translate("common:buttons.logout", "Logout")}
                    </Menu.Item>
                )}
            </Menu>
        </>
    );
};
