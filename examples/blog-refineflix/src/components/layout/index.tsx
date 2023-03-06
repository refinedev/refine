import React from "react";
import { LayoutProps } from "@refinedev/core";
import { Layout as AntdLayout, Grid } from "antd";
import { Header } from "components";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const breakpoint = Grid.useBreakpoint();

    return (
        <AntdLayout
            style={{
                minHeight: "100vh",
                backgroundColor: "#f0f2f5",
            }}
        >
            <Header />
            <AntdLayout.Content>
                <div
                    style={{
                        padding: breakpoint.sm ? 24 : 12,
                        minHeight: 360,
                    }}
                >
                    {children}
                </div>
            </AntdLayout.Content>
        </AntdLayout>
    );
};
