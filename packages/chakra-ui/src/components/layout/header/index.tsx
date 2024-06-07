import React from "react";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import { Box, Avatar, Text, HStack } from "@chakra-ui/react";

import type { RefineLayoutHeaderProps } from "../types";

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const shouldRenderHeader = user && (user.name || user.avatar);

  return shouldRenderHeader ? (
    <Box
      py="2"
      px="4"
      display="flex"
      justifyContent="flex-end"
      w="full"
      bg="chakra-body-bg"
    >
      <HStack>
        <Text size="sm" fontWeight="bold">
          {user?.name}
        </Text>
        <Avatar size="sm" name={user?.name} src={user?.avatar} />
      </HStack>
    </Box>
  ) : null;
};
