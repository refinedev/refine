import React from "react";
import { ThemedLayoutContextProvider } from "@refinedev/antd";

import { Header } from "./header";
import { Sider } from "./sider";
import { Banner } from "./banner";
import { Grid, Layout as AntdLayout } from "antd";

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const breakpoint = Grid.useBreakpoint();
    const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm;

    return (
        <ThemedLayoutContextProvider>
            <Banner />
            <AntdLayout style={{ minHeight: "100vh" }}>
                <Sider />
                <AntdLayout>
                    <Header />
                    <AntdLayout.Content
                        style={{
                            padding: isSmall ? 32 : 16,
                        }}
                    >
                        {children}
                    </AntdLayout.Content>
                </AntdLayout>
            </AntdLayout>
        </ThemedLayoutContextProvider>
    );
};
