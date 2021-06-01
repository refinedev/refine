import React from "react";
import { Layout } from "antd";

export const Footer: React.FC = () => (
    <Layout.Footer style={{ textAlign: "center" }}>
        Refine ©{new Date().getFullYear()} Created by Pankod
    </Layout.Footer>
);
