import React from "react";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import {
  Avatar,
  Group,
  AppShell,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

import type { RefineThemedLayoutHeaderProps } from "../types";

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/mantine/components/mantine-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
export const ThemedHeader: React.FC<RefineThemedLayoutHeaderProps> = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const borderColor =
    colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2];

  const shouldRenderHeader = user && (user.name || user.avatar);

  if (!shouldRenderHeader) {
    return null;
  }

  return (
    <AppShell.Header
      zIndex={199}
      // height={64}
      py={6}
      px="sm"
      style={{
        height: 64,
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <Group
        justify="right"
        align="center"
        style={{
          height: "100%",
        }}
      >
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
    </AppShell.Header>
  );
};
