import React from "react";
import { Layout as AntdLayout, Typography, Avatar, Space, theme } from "antd";
import { useActiveAuthProvider, useGetIdentity } from "@refinedev/core";
import type { RefineThemedLayoutHeaderProps } from "../types";

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/antd/components/antd-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
export const ThemedHeader: React.FC<RefineThemedLayoutHeaderProps> = () => {
  const { token } = theme.useToken();

  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const shouldRenderHeader = user && (user.name || user.avatar);

  if (!shouldRenderHeader) {
    return null;
  }

  return (
    <AntdLayout.Header
      style={{
        backgroundColor: token.colorBgElevated,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
      }}
    >
      <Space>
        <Space size="middle">
          {user?.name && <Typography.Text strong>{user.name}</Typography.Text>}
          {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
