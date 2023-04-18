import React from "react";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import { Box, Avatar, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { RefineThemedLayoutV2HeaderProps } from "../types";
import { HamburgerMenu } from "../hamburgerMenu";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
    const authProvider = useActiveAuthProvider();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const bgColor = useColorModeValue(
        "refine.header.bg.light",
        "refine.header.bg.dark",
    );

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
        </Box>
    );
};
