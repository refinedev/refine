import React from "react";
import { Layout } from "antd";

export const Footer = () => (
    <Layout.Footer style={{ textAlign: "center" }}>
        Refine ©{new Date().getFullYear()} Created by Pankod
    </Layout.Footer>
);
