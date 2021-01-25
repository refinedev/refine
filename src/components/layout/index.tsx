import React from "react";
import { Layout as AntLayout, Menu } from "antd";
import { LogoutOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IState } from "@interfaces";
export interface LayoutProps {
    menuOnClick?: MenuClickEventHandler;
}

export const Layout: React.FC<LayoutProps> = ({ menuOnClick, children }) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const resources = useSelector((state: IState) => state.resources);

    const renderResourceTitle = (title: string) => {
        return title.charAt(0).toUpperCase() + title.slice(1);
    };

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
                    {Object.keys(resources).map((item) => (
                        <Menu.Item
                            key={`resource-${item}`}
                            icon={<UnorderedListOutlined />}
                        >
                            <Link to={`/resources/${item}`}>
                                {renderResourceTitle(item)}
                            </Link>
                        </Menu.Item>
                    ))}
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
