import React from "react";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import {
  Box,
  Avatar,
  Text,
  HStack,
  useColorModeValue,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import type { RefineThemedLayoutHeaderProps } from "../types";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/chakra-ui/components/chakra-ui-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
export const ThemedHeader: React.FC<RefineThemedLayoutHeaderProps> = ({
  isSiderOpen,
  onToggleSiderClick,
  toggleSiderIcon: toggleSiderIconFromProps,
}) => {
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const bgColor = useColorModeValue(
    "refine.header.bg.light",
    "refine.header.bg.dark",
  );

  const hasSidebarToggle = Boolean(onToggleSiderClick);

  return (
    <Box
      py="2"
      pr="4"
      pl="2"
      display="flex"
      alignItems="center"
      justifyContent={
        hasSidebarToggle
          ? { base: "flex-end", md: "space-between" }
          : "flex-end"
      }
      w="full"
      height="64px"
      bg={bgColor}
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    >
      {hasSidebarToggle && (
        <IconButton
          display={{ base: "none", md: "flex" }}
          backgroundColor="transparent"
          aria-label="sidebar-toggle"
          onClick={() => onToggleSiderClick?.()}
        >
          {toggleSiderIconFromProps?.(Boolean(isSiderOpen)) ??
            (isSiderOpen ? (
              <Icon as={IconLayoutSidebarLeftCollapse} boxSize={"24px"} />
            ) : (
              <Icon as={IconLayoutSidebarLeftExpand} boxSize={"24px"} />
            ))}
        </IconButton>
      )}

      <HStack>
        {user?.name && (
          <Text size="sm" fontWeight="bold">
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
  );
};
