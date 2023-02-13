import React from "react";
import { useTitle, useMenu } from "@pankod/refine-core";
import { Menu } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6/legacy";

const { Link } = routerProvider;

export const CustomSider: React.FC = () => {
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();

    return (
        <>
            {Title && <Title collapsed={false} />}
            <Menu selectedKeys={[selectedKey]} mode="horizontal">
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route ?? ""}>{label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </>
    );
};
