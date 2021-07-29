import React, { useState } from "react";
import { AntdLayout, Menu, Link, useMenu, useTitle } from "@pankod/refine";

export const FixedSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();

    return (
        <AntdLayout.Sider
            collapsible
            breakpoint="md"
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
            }}
        >
            <Title collapsed={collapsed} />
            <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline">
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route}>{label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </AntdLayout.Sider>
    );
};
