import React from "react";
import { Layout as AntLayout } from "antd";

import { LayoutProps } from "@pankod/refine-core";

export const Layout: React.FC<LayoutProps> = ({
    children,
    Header,
    OffLayoutArea,
}) => {
    return (
        <AntLayout style={{ minHeight: "100vh", flexDirection: "row" }}>
            <AntLayout>
                <Header />
                <AntLayout.Content>
                    {children}
                    <OffLayoutArea />
                </AntLayout.Content>
            </AntLayout>
        </AntLayout>
    );
};
