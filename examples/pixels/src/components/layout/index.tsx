import React from "react";
import { AntdLayout, Layout as RefineAntdLayout } from "@pankod/refine-antd";
import { LayoutProps } from "@pankod/refine-core";

export const Layout: React.FC<LayoutProps> = ({ children, ...props }) => {
    return (
        <RefineAntdLayout {...props}>
            <AntdLayout.Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    backgroundColor: "white",
                }}
            >
                {children}
            </AntdLayout.Content>
        </RefineAntdLayout>
    );
};
