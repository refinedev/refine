import React, { useState } from "react";
import { Layout, Menu, Grid } from "antd";
import { LogoutOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
    useTranslate,
    useLogout,
    useTitle,
    useNavigation,
    CanAccess,
    useIsExistAuthentication,
    createTreeView,
} from "@pankod/refine-core";

import { Title as DefaultTitle } from "@components";

import { useMenu } from "@hooks";

import { antLayoutSider, antLayoutSiderMobile } from "./styles";
import { ITreeMenu } from "src";
const { SubMenu } = Menu;

export const Sider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const isExistAuthentication = useIsExistAuthentication();
    const { mutate: logout } = useLogout();
    const Title = useTitle();
    const translate = useTranslate();
    const { menuItems, selectedKey } = useMenu();
    const { push } = useNavigation();
    const breakpoint = Grid.useBreakpoint();

    const isMobile = !breakpoint.lg;

    const RenderToTitle = Title ?? DefaultTitle;

    const treeMenu: ITreeMenu[] = createTreeView(menuItems);

    console.log("treeMenu", treeMenu);

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children } = item;
            if (children.length > 0) {
                return (
                    <CanAccess
                        key={route}
                        resource={name.toLowerCase()}
                        action="list"
                    >
                        <SubMenu
                            key={name}
                            icon={icon ?? <UnorderedListOutlined />}
                            title={label}
                        >
                            {renderTreeView(children, selectedKey)}
                        </SubMenu>
                    </CanAccess>
                );
            } else {
                const isSelected = route === selectedKey;
                const isRoute = route.split("/").length === 2;

                return (
                    <CanAccess
                        key={route}
                        resource={name.toLowerCase()}
                        action="list"
                    >
                        <Menu.Item
                            key={name}
                            onClick={() => {
                                push(route);
                            }}
                            style={{
                                fontWeight: isSelected ? "bold" : "normal",
                            }}
                            icon={
                                icon ?? (isRoute && <UnorderedListOutlined />)
                            }
                        >
                            {/* <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            > */}
                            {label}
                            {!collapsed && isSelected && (
                                <div className="ant-menu-submenu-arrow" />
                            )}

                            {/* </div> */}
                        </Menu.Item>
                    </CanAccess>
                );
            }
        });
    };

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            collapsedWidth={isMobile ? 0 : 80}
            breakpoint="lg"
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            <RenderToTitle collapsed={collapsed} />
            <Menu
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={({ key }) => {
                    if (key === "logout") {
                        logout();
                        return;
                    }

                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }

                    push(key as string);
                }}
            >
                {renderTreeView(treeMenu, selectedKey)}

                {isExistAuthentication && (
                    <Menu.Item key="logout" icon={<LogoutOutlined />}>
                        {translate("buttons.logout", "Logout")}
                    </Menu.Item>
                )}
            </Menu>
        </Layout.Sider>
    );
};
