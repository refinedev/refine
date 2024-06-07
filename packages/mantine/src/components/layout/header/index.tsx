import React from "react";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import { Avatar, Group, Header as MantineHeader, Title } from "@mantine/core";

import type { RefineLayoutHeaderProps } from "../types";

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const shouldRenderHeader = user && (user.name || user.avatar);

  return shouldRenderHeader ? (
    <MantineHeader height={50} py={6} px="sm">
      <Group position="right">
        <Title order={6}>{user?.name}</Title>
        <Avatar src={user?.avatar} alt={user?.name} radius="xl" />
      </Group>
    </MantineHeader>
  ) : null;
};
