import React from "react";
import { Layout, Typography, Avatar, Space } from "antd";

import { useGetIdentity } from "@pankod/refine-core";

export const Header: React.FC = () => {
    return (
        <Layout.Header
            style={{
                display: "flex",
                alignItems: "center",
                padding: "0px 24px",
                height: "64px",
                backgroundColor: "#831010",
                color: "white",
                fontWeight: "bold",
                fontSize: 26,
            }}
        >
            Refineflix
        </Layout.Header>
    );
};
