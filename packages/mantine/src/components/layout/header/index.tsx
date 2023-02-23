import React from "react";
import { useGetIdentity, useProvidedAuthProvider } from "@pankod/refine-core";
import { Avatar, Group, Header as MantineHeader, Title } from "@mantine/core";

import { RefineLayoutHeaderProps } from "../types";

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
    const authProvider = useProvidedAuthProvider();
    const { data: user } = useGetIdentity({
        legacy: Boolean(authProvider?.isLegacy),
    });

    const shouldRenderHeader = user && (user.name || user.avatar);

    return shouldRenderHeader ? (
        <MantineHeader height={50} py={6} px="sm">
            <Group position="right">
                <Title order={6}>{user?.name}</Title>
                <Avatar src={user?.avatar} alt={user?.name} radius="xl" />
            </Group>
        </MantineHeader>
    ) : null;
};
