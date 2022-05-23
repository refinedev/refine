import React, { useState } from "react";
import {
    useTitle,
    useLogout,
    ITreeMenu,
    CanAccess,
    useRouterContext,
} from "@pankod/refine-core";
import { AntdLayout, Menu, useMenu, Grid, Icons } from "@pankod/refine-antd";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

import { StoreSelect } from "components/select";

export const CustomSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { mutate: logout } = useLogout();
    const { Link } = useRouterContext();
    const Title = useTitle();
    const { SubMenu } = Menu;
    const { menuItems, selectedKey } = useMenu();
    const breakpoint = Grid.useBreakpoint();

    const isMobile = !breakpoint.lg;

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children, parentName } = item;

            if (children.length > 0) {
                return (
                    <SubMenu
                        key={name}
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
                >
                    <Menu.Item
                        key={selectedKey}
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
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            {Title && <Title collapsed={collapsed} />}
            <Menu selectedKeys={[selectedKey]} mode="inline">
                <Menu.Item
                    key={selectedKey}
                    icon={<Icons.AppstoreAddOutlined />}
                >
                    <StoreSelect
                        onSelect={() => {
                            setCollapsed(true);
                        }}
                    />
                </Menu.Item>
                {renderTreeView(menuItems, selectedKey)}
                <Menu.Item
                    key="logout"
                    onClick={() => logout()}
                    icon={<Icons.LogoutOutlined />}
                >
                    Logout
                </Menu.Item>
            </Menu>
        </AntdLayout.Sider>
    );
};
