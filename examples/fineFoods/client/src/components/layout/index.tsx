// import { Card, Button, Row, Col } from "@pankod/refine";

// import { Header, Footer } from "@components";

require("./layout.less");

// export const Layout: React.FC = ({ children }) => {
//     return (
//         <Row className="layout">
//             <Col span={24}>
//                 <Header />
//             </Col>
//             <Col span={24}>{children}</Col>
//             <Col span={24}>
//                 <Footer />
//             </Col>
//         </Row>
//     );
// };

import React from "react";
// import { Layout as AntLayout, Grid } from "antd";

import { LayoutProps, AntdLayout, Grid } from "@pankod/refine";

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
            <Footer />
        </AntdLayout>
    );
};
