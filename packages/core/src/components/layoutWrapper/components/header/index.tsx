import React from "react";
import { Layout, Typography, Avatar } from "antd";

import { useGetIdentity } from "@hooks";

export const Header: React.FC = () => {
    const { data: user } = useGetIdentity();

    const shouldRenderHeader = user && user.name && user.avatar;

    return shouldRenderHeader ? (
        <Layout.Header
            style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0px 24px 0px 24px",
                height: "48px",
                backgroundColor: "#FFF",
            }}
        >
            <Typography.Text strong>{user.name}</Typography.Text>
            <Avatar src={user.avatar} style={{ marginLeft: "16px" }} />
        </Layout.Header>
    ) : null;
};
