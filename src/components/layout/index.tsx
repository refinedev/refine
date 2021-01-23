import React from "react";
import { Layout as AntLayout, Menu } from "antd";
import { LogoutOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { MenuClickEventHandler } from "rc-menu/lib/interface";

export interface LayoutProps {
    menuOnClick?: MenuClickEventHandler;
}

export const Layout: React.FC<LayoutProps> = ({ menuOnClick, children }) => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <AntLayout style={{ minHeight: "100vh" }}>
            <AntLayout.Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(collapsed) => setCollapsed(collapsed)}
            >
                <div
                    style={{
                        color: "#FFF",
                        fontSize: 16,
                        textAlign: "center",
                        height: 60,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    Brand Name
                </div>
                <Menu
                    onClick={menuOnClick}
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                >
                    <Menu.Item key="menu1" icon={<UnorderedListOutlined />}>
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="menu2" icon={<UnorderedListOutlined />}>
                        Option 2
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />}>
                        Logout
                    </Menu.Item>
                </Menu>
            </AntLayout.Sider>
            <AntLayout className="site-layout">
                <AntLayout.Header
                    style={{ padding: 0, backgroundColor: "#FFF" }}
                />
                <AntLayout.Content style={{ margin: "0 16px" }}>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </AntLayout.Content>
            </AntLayout>
        </AntLayout>
    );
};
