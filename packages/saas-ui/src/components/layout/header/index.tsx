import React from "react";
import { RefineLayoutHeaderProps } from "@pankod/refine-ui-types";
import { useGetIdentity } from "@pankod/refine-core";
import { Avatar, HStack, Heading } from "@chakra-ui/react";

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
    const { data: user } = useGetIdentity();

    const shouldRenderHeader = user && (user.name || user.avatar);

    return shouldRenderHeader ? (
        <HStack height={50} py={6} px="sm">
            <HStack alignSelf="right">
                <Heading as="h6">{user?.name}</Heading>
                <Avatar src={user?.avatar} name={user?.name} size="xl" />
            </HStack>
        </HStack>
    ) : null;
};
