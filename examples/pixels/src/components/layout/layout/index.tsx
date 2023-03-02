import React from "react";
import { LayoutProps } from "@pankod/refine-core";
import { AntdLayout } from "@pankod/refine-antd";

import { Header } from "components/layout";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <AntdLayout
            style={{
                minHeight: "100vh",
                backgroundImage: "url('/bg.png')",
                backgroundRepeat: "repeat-x",
            }}
        >
            <Header />
            <AntdLayout.Content>{children}</AntdLayout.Content>
        </AntdLayout>
    );
};
