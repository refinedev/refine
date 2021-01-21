import React from "react";
import { Layout as AntLayout, Menu } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

export const Layout: React.FC = ({ children }) => {
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
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1" icon={<UnorderedListOutlined />}>
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                        Option 2
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
