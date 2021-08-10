import React, { useState } from "react";
import {
    AntdLayout,
    Menu,
    Link,
    useMenu,
    useTitle,
    Grid,
} from "@pankod/refine";

export const CustomSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();
    const breakpoint = Grid.useBreakpoint();

    return (
        <AntdLayout.Sider
            collapsible
            collapsedWidth={!breakpoint.lg ? 0 : 80}
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
        >
            <Title collapsed={collapsed} />
            <Menu selectedKeys={[selectedKey]} mode="inline">
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route}>{label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </AntdLayout.Sider>
    );
};
