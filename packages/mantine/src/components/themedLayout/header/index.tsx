import React from "react";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import {
  Avatar,
  Group,
  Header as MantineHeader,
  Title,
  useMantineTheme,
} from "@mantine/core";

import type { RefineThemedLayoutHeaderProps } from "../types";

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/mantine/components/mantine-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
export const ThemedHeader: React.FC<RefineThemedLayoutHeaderProps> = () => {
  const theme = useMantineTheme();

  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const borderColor =
    theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2];

  return (
    <MantineHeader
      zIndex={199}
      height={64}
      py={6}
      px="sm"
      sx={{
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <Group
        position="right"
        align="center"
        sx={{
          height: "100%",
        }}
      >
        <Title
          order={6}
          sx={{
            cursor: "pointer",
          }}
        >
          {user?.name}
        </Title>
        <Avatar src={user?.avatar} alt={user?.name} radius="xl" />
      </Group>
    </MantineHeader>
  );
};
