import React from "react";
import { Layout as AntLayout, Grid } from "antd";
import { LayoutProps } from "@pankod/refine-core";

export const Layout: React.FC<LayoutProps> = ({
    children,
    Header,
    Sider,
    Footer,
    OffLayoutArea,
}) => {
    const breakpoint = Grid.useBreakpoint();

    return (
        <AntLayout style={{ minHeight: "100vh", flexDirection: "row" }}>
            <Sider />
            <AntLayout>
                <Header />
                <AntLayout.Content>
                    <div
                        style={{
                            padding: breakpoint.sm ? 24 : 12,
                            minHeight: 360,
                        }}
                    >
                        {children}
                    </div>
                    <OffLayoutArea />
                </AntLayout.Content>
                <Footer />
            </AntLayout>
        </AntLayout>
    );
};
