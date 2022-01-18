import React from "react";
import { LayoutProps } from "@pankod/refine-core";
import { AntdLayout } from "@pankod/refine-antd";

import { OrdersModal } from "@components";

require("./style.less");

// TODO: fix me
export const Layout: React.FC<any> = ({
    children,
    Header,
    Footer,
    OffLayoutArea,
}) => {
    return (
        <>
            <AntdLayout style={{ minHeight: "100vh" }}>
                <Header />
                <AntdLayout className="inner">
                    <AntdLayout.Content>
                        {children}
                        <OffLayoutArea />
                    </AntdLayout.Content>
                </AntdLayout>
                <Footer />
            </AntdLayout>
            <OrdersModal />
        </>
    );
};
