import React from "react";

import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";

import { Avatar, Title, Group } from "@mantine/core";

import type { RefineThemedLayoutV2HeaderProps } from "../types";
import { HamburgerMenu } from "../hamburgerMenu";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const shouldRenderUserInfo = user && (user.name || user.avatar);

  return (
    <Group
      justify="space-between"
      style={{
        height: "100%",
      }}
    >
      <HamburgerMenu />
      {shouldRenderUserInfo && (
        <Group justify="right" align="center">
          <Title
            order={6}
            style={{
              cursor: "pointer",
            }}
          >
            {user?.name}
          </Title>
          <Avatar src={user?.avatar} alt={user?.name} radius="xl" />
        </Group>
      )}
    </Group>
  );
};
