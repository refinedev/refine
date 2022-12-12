import React from "react";
import { Layout, Typography, Avatar, Space } from "antd";

import { useGetIdentity } from "@pankod/refine-core";

const { Text } = Typography;

export const Header: React.FC = () => {
    const { data: user } = useGetIdentity();

    const shouldRenderHeader = user && (user.name || user.avatar);

    return shouldRenderHeader ? (
        <Layout.Header
            style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0px 24px",
                height: "64px",
                backgroundColor: "#FFF",
            }}
        >
            <Space>
                {user.name && (
                    <Text ellipsis strong>
                        {user.name}
                    </Text>
                )}
                {user.avatar && (
                    <Avatar size="large" src={user?.avatar} alt={user?.name} />
                )}
            </Space>
        </Layout.Header>
    ) : null;
};
