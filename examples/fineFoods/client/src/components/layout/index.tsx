import React from "react";
import { LayoutProps, AntdLayout } from "@pankod/refine";

import { OrdersModal } from "@components";

require("./layout.less");

export const Layout: React.FC<LayoutProps> = ({
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
