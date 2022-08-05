import React from "react";
import { Layout as AntLayout, Grid } from "antd";
import { RefineLayoutLayoutProps } from "@pankod/refine-ui-types";

import { Sider as DefaultSider } from "./sider";
import { Header as DefaultHeader } from "./header";

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
        <AntLayout style={{ minHeight: "100vh", flexDirection: "row" }}>
            <SiderToRender />
            <AntLayout>
                <HeaderToRender />
                <AntLayout.Content>
                    <div
                        style={{
                            padding: isSmall ? 24 : 12,
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
