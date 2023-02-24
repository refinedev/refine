import React from "react";
import { Layout as AntdLayout, Typography, Avatar, Space } from "antd";
import { useGetIdentity, useActiveAuthProvider } from "@pankod/refine-core";
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
        </AntdLayout.Header>
    ) : null;
};
