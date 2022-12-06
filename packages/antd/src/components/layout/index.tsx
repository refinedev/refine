import React from "react";
import { Layout as AntdLayout } from "antd";

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
    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;

    return (
        <AntdLayout style={{ minHeight: "100vh", flexDirection: "row" }}>
            <SiderToRender />
            <AntdLayout>
                <HeaderToRender />
                <AntdLayout.Content>
                    <div
                        style={{
                            minHeight: 360,
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
