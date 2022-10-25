import React from "react";
import { RefineLayoutHeaderProps } from "@pankod/refine-ui-types";
import { useGetIdentity } from "@pankod/refine-core";
import { Box, Avatar, Text, HStack } from "@chakra-ui/react";

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
    const { data: user } = useGetIdentity();

    const shouldRenderHeader = user && (user.name || user.avatar);

    return shouldRenderHeader ? (
        <Box
            bg="white"
            p="2.5"
            display="flex"
            justifyContent="flex-end"
            w="100%"
        >
            <HStack>
                <Text size="sm" fontWeight="bold">
                    {user?.name}
                </Text>
                <Avatar
                    bg="primary"
                    color="white"
                    size="sm"
                    name={user?.name}
                    src={user?.avatar}
                />
            </HStack>
        </Box>
    ) : null;
};
