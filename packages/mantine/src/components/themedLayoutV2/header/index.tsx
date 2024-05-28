import React from "react";
import {
  useGetIdentity,
  useActiveAuthProvider,
  pickNotDeprecated,
} from "@refinedev/core";
import {
  Avatar,
  Flex,
  Header as MantineHeader,
  type Sx,
  Title,
  useMantineTheme,
} from "@mantine/core";

import type { RefineThemedLayoutV2HeaderProps } from "../types";
import { HamburgerMenu } from "../hamburgerMenu";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
  sticky,
}) => {
  const theme = useMantineTheme();

  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const borderColor =
    theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2];

  let stickyStyles: Sx = {};
  if (pickNotDeprecated(sticky, isSticky)) {
    stickyStyles = {
      position: "sticky",
      top: 0,
      zIndex: 1,
    };
  }

  return (
    <MantineHeader
      zIndex={199}
      height={64}
      py={6}
      px="sm"
      sx={{
        borderBottom: `1px solid ${borderColor}`,
        ...stickyStyles,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        sx={{
          height: "100%",
        }}
      >
        <HamburgerMenu />
        <Flex align="center" gap="sm">
          {user?.name && (
            <Title order={6} data-testid="header-user-name">
              {user?.name}
            </Title>
          )}
          {user?.avatar && (
            <Avatar src={user?.avatar} alt={user?.name} radius="xl" />
          )}
        </Flex>
      </Flex>
    </MantineHeader>
  );
};
