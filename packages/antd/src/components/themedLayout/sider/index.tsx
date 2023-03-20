import React from "react";
import { Layout, Button, theme } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { RefineThemedLayoutSiderProps } from "../types";
import { ThemedTitle } from "../title";
import { useSider } from "@hooks/layout/useSider";

const { useToken } = theme;

export const ThemedSider: React.FC<RefineThemedLayoutSiderProps> = ({
    Title: TitleFromProps,
    meta,
    render,
}) => {
    const { token } = useToken();

    const RenderToTitle = TitleFromProps ?? ThemedTitle;

    const { collapsed, setCollapsed, isMobile, renderMenu, renderDrawerSider } =
        useSider({
            meta,
            render,
            Title: RenderToTitle,
        });

    if (isMobile) {
        return renderDrawerSider();
    }

    return (
        <Layout.Sider
            style={{
                backgroundColor: token.colorBgContainer,
                borderRight: `1px solid ${token.colorBgElevated}`,
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed) => setCollapsed(collapsed)}
            collapsedWidth={80}
            breakpoint="lg"
            trigger={
                <Button
                    type="text"
                    style={{
                        borderRadius: 0,
                        height: "100%",
                        width: "100%",
                        backgroundColor: token.colorBgElevated,
                    }}
                >
                    {collapsed ? (
                        <RightOutlined
                            style={{
                                color: token.colorPrimary,
                            }}
                        />
                    ) : (
                        <LeftOutlined
                            style={{
                                color: token.colorPrimary,
                            }}
                        />
                    )}
                </Button>
            }
        >
            <RenderToTitle collapsed={collapsed} />
            {renderMenu()}
        </Layout.Sider>
    );
};
