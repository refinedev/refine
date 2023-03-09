import React from "react";
import { Grid, Layout as AntdLayout } from "antd";

import { Sider as DefaultSider } from "./sider";
import { Header as DefaultHeader } from "./header";
import { RefineLayoutLayoutProps } from "./types";

export const Layout: React.FC<RefineLayoutLayoutProps> = ({
    children,
    Header,
    Sider,
    Footer,
    OffLayoutArea,
}) => {
    const breakpoint = Grid.useBreakpoint();
    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;
    const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm;

    return (
        <AntdLayout style={{ minHeight: "100vh" }}>
            <SiderToRender />
            <AntdLayout>
                <HeaderToRender />
                <AntdLayout.Content>
                    <div
                        style={{
                            minHeight: 360,
                            padding: isSmall ? 24 : 12,
                        }}
                    >
                        {children}
                    </div>
                    {OffLayoutArea && <OffLayoutArea />}
                </AntdLayout.Content>
                {Footer && <Footer />}
            </AntdLayout>
        </AntdLayout>
    );
};
