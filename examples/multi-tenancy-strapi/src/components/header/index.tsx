import React from "react";
import { Layout as AntdLayout, Typography, Avatar, Space, theme } from "antd";
import { useGetIdentity } from "@refinedev/core";
import { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";

import { StoreSelect } from "../select";

const { Text } = Typography;
const { useToken } = theme;

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
    const { token } = useToken();
    const { data: user } = useGetIdentity<{ username: string }>();

    return (
        <AntdLayout.Header
            style={{
                backgroundColor: token.colorBgElevated,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0px 24px",
                height: "64px",
                position: "sticky",
                top: 0,
                zIndex: 1,
            }}
        >
            <Space
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <StoreSelect />
                <Space size="middle">
                    {user?.username && (
                        <>
                            <Text strong>{user.username}</Text>
                            <Avatar>{user.username?.[0].toUpperCase()}</Avatar>
                        </>
                    )}
                </Space>
            </Space>
        </AntdLayout.Header>
    );
};
