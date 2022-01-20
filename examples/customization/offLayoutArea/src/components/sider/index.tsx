import React, { useState } from "react";
import { useTitle, useNavigation } from "@pankod/refine-core";

import { AntdLayout, Menu, Icons, useMenu } from "@pankod/refine-antd";

export const FixedSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();
    const { push } = useNavigation();

    return (
        <AntdLayout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
            }}
        >
            {Title && <Title collapsed={collapsed} />}

            <Menu
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={({ key }) => {
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
                                {isSelected && <Icons.RightOutlined />}
                            </div>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </AntdLayout.Sider>
    );
};
