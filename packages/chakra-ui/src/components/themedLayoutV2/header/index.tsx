import React from "react";
import {
  useGetIdentity,
  useActiveAuthProvider,
  pickNotDeprecated,
} from "@refinedev/core";
import {
  Box,
  Avatar,
  Text,
  HStack,
  useColorModeValue,
  type BoxProps,
} from "@chakra-ui/react";
import type { RefineThemedLayoutV2HeaderProps } from "../types";
import { HamburgerMenu } from "../hamburgerMenu";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
  sticky,
}) => {
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const bgColor = useColorModeValue(
    "refine.header.bg.light",
    "refine.header.bg.dark",
  );

  let stickyProps: BoxProps = {};
  if (pickNotDeprecated(sticky, isSticky)) {
    stickyProps = {
      position: "sticky",
      top: 0,
      zIndex: 1,
    };
  }

  return (
    <Box
      py="2"
      px="4"
      display="flex"
      alignItems="center"
      w="full"
      height="64px"
      bg={bgColor}
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      {...stickyProps}
    >
      <Box
        w="full"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <HamburgerMenu />
        <HStack>
          {user?.name && (
            <Text size="sm" fontWeight="bold" data-testid="header-user-name">
              {user.name}
            </Text>
          )}
          {user?.avatar && (
            <Avatar
              size="sm"
              name={user?.name || "Profile Photo"}
              src={user.avatar}
            />
          )}
        </HStack>
      </Box>
    </Box>
  );
};
