import React from "react";
import { LayoutProps } from "@pankod/refine-core";
import { AntdLayout } from "@pankod/refine-antd";

import { OrdersModal } from "@components";

require("./style.less");

export const Layout: React.FC<LayoutProps> = ({
    children,
    Header,
    Footer,
    OffLayoutArea,
}) => {
    return (
        <>
            <AntdLayout style={{ minHeight: "100vh" }}>
                {Header && <Header />}
                <AntdLayout className="inner">
                    <AntdLayout.Content>
                        {children}
                        {OffLayoutArea && <OffLayoutArea />}
                    </AntdLayout.Content>
                </AntdLayout>
                {Footer && <Footer />}
            </AntdLayout>
            <OrdersModal />
        </>
    );
};
