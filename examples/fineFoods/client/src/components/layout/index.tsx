import React from "react";
import { LayoutProps, AntdLayout } from "@pankod/refine";

require("./layout.less");

export const Layout: React.FC<LayoutProps> = ({
    children,
    Header,
    Footer,
    OffLayoutArea,
}) => {
    return (
        <AntdLayout style={{ minHeight: "100vh" }}>
            <AntdLayout className="inner">
                <Header />
                <AntdLayout.Content>
                    {children}
                    <OffLayoutArea />
                </AntdLayout.Content>
            </AntdLayout>
            {/* <Footer /> */}
        </AntdLayout>
    );
};
