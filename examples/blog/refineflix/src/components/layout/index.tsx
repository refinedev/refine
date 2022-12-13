import React from "react";
import { LayoutProps } from "@pankod/refine-core";
import { AntdLayout, Grid } from "@pankod/refine-antd";
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
