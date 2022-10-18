import React from "react";
import { RefineLayoutHeaderProps } from "@pankod/refine-ui-types";
import { useGetIdentity } from "@pankod/refine-core";
import { Box, Avatar } from "@chakra-ui/react";

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
    const { data: user } = useGetIdentity();

    const shouldRenderHeader = user && (user.name || user.avatar);

    return shouldRenderHeader ? (
        <Box height={50} py={6} px="sm">
            <span>{user?.name}</span>
            <Avatar src={user?.avatar} />
        </Box>
    ) : null;
};
