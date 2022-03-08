import React from "react";
import { Layout as AntLayout, Grid } from "antd";
import { LayoutProps } from "@pankod/refine-core";

import { Sider as DefaultSider } from "./sider";
import { Header as DefaultHeader } from "./header";

export const Layout: React.FC<LayoutProps> = ({
    children,
    Header,
    Sider,
    Footer,
    OffLayoutArea,
}) => {
    const breakpoint = Grid.useBreakpoint();

    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;

    return (
        <AntLayout style={{ minHeight: "100vh", flexDirection: "row" }}>
            <SiderToRender />
            <AntLayout>
                <HeaderToRender />
                <AntLayout.Content>
                    <div
                        style={{
                            padding: breakpoint.sm ? 24 : 12,
                            minHeight: 360,
                        }}
                    >
                        {children}
                    </div>
                    {OffLayoutArea && <OffLayoutArea />}
                </AntLayout.Content>
                {Footer && <Footer />}
            </AntLayout>
        </AntLayout>
    );
};
