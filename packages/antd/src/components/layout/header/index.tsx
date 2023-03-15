import { useActiveAuthProvider, useGetIdentity } from "@refinedev/core";
import { Avatar, Layout as AntdLayout, Space, Typography } from "antd";
import React from "react";
import { RefineLayoutHeaderProps } from "../types";
const { Text } = Typography;

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
    const authProvider = useActiveAuthProvider();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const shouldRenderHeader = user && (user.name || user.avatar);

    return shouldRenderHeader ? (
        <AntdLayout.Header
            style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0px 24px",
                height: "64px",
            }}
        >
            <Space style={{ marginLeft: "8px" }}>
                {user?.name && (
                    <Text style={{ color: "white" }} strong>
                        {user.name}
                    </Text>
                )}
                {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
            </Space>
        </AntdLayout.Header>
    ) : null;
};
