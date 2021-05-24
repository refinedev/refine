import React from "react";
import { Layout as AntLayout } from "antd";

import { LayoutProps } from "../../../../interfaces/customComponents";

export const Layout: React.FC<LayoutProps> = ({
    children,
    Sider,
    // Header,
    Footer,
    OffLayoutArea,
}) => {
    return (
        <AntLayout style={{ minHeight: "100vh" }}>
            <Sider />
            <AntLayout className="site-layout">
                {/* <Header /> */}
                <AntLayout.Content>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                    <OffLayoutArea />
                </AntLayout.Content>
                <Footer />
            </AntLayout>
        </AntLayout>
    );
};
