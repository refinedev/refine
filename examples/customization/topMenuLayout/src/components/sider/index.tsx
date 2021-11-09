import React from "react";
import { Menu, useMenu, useTitle } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

const { Link } = routerProvider;

export const CustomSider: React.FC = () => {
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();

    return (
        <>
            <Title collapsed={false} />
            <Menu selectedKeys={[selectedKey]} mode="horizontal">
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route}>{label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </>
    );
};
