import React, { useState } from "react";
import {
    useTitle,
    ITreeMenu,
    CanAccess,
    useRouterContext,
} from "@pankod/refine-core";

import { AntdLayout, Menu, Icons, useMenu } from "@pankod/refine-antd";

export const FixedSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const Title = useTitle();
    const { Link } = useRouterContext();
    const { SubMenu } = Menu;
    const { menuItems, selectedKey } = useMenu();

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children, parentName } = item;

            if (children.length > 0) {
                return (
                    <SubMenu
                        key={route}
                        icon={icon ?? <Icons.UnorderedListOutlined />}
                        title={label}
                    >
                        {renderTreeView(children, selectedKey)}
                    </SubMenu>
                );
            }
            const isSelected = route === selectedKey;
            const isRoute = !(
                parentName !== undefined && children.length === 0
            );
            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{ resource: item }}
                >
                    <Menu.Item
                        key={route}
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
                        }}
                        icon={
                            icon ?? (isRoute && <Icons.UnorderedListOutlined />)
                        }
                    >
                        <Link to={route}>{label}</Link>
                        {!collapsed && isSelected && (
                            <div className="ant-menu-tree-arrow" />
                        )}
                    </Menu.Item>
                </CanAccess>
            );
        });
    };

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

            <Menu selectedKeys={[selectedKey]} mode="inline">
                {renderTreeView(menuItems, selectedKey)}
            </Menu>
        </AntdLayout.Sider>
    );
};
