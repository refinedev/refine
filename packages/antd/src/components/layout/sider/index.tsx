import React from "react";
import { Layout, ConfigProvider } from "antd";

import { Title as DefaultTitle } from "@components";

import { RefineLayoutSiderProps } from "../types";
import { useSider } from "@hooks/layout";

export const Sider: React.FC<RefineLayoutSiderProps> = ({
    Title: TitleFromProps,
    render,
    meta,
}) => {
    const RenderToTitle = TitleFromProps ?? DefaultTitle;

    const { collapsed, setCollapsed, isMobile, renderMenu, renderDrawerSider } =
        useSider({
            meta,
            render,
            Title: RenderToTitle,
        });

    const renderContent = () => {
        if (isMobile) {
            return renderDrawerSider();
        }

        return (
            <Layout.Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(collapsed: boolean): void =>
                    setCollapsed(collapsed)
                }
                collapsedWidth={80}
                breakpoint="lg"
            >
                <RenderToTitle collapsed={collapsed} />
                {renderMenu()}
            </Layout.Sider>
        );
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        colorItemBg: "transparent",
                        colorItemText: "#fff",
                        colorItemTextSelected: "#fff",
                        colorItemBgSelected: "transparent",
                        colorItemTextHover: "#fff",
                    },
                },
            }}
        >
            {renderContent()}
        </ConfigProvider>
    );
};
