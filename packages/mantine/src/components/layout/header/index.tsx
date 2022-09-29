import React from "react";
import { RefineLayoutHeaderProps } from "@pankod/refine-ui-types";
import { useGetIdentity } from "@pankod/refine-core";
import {
    Avatar,
    Group,
    Header as MantineHeader,
    Title as MantineTitle,
} from "@mantine/core";

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
    const { data: user } = useGetIdentity();

    const shouldRenderHeader = user && (user.name || user.avatar);

    return shouldRenderHeader ? (
        <MantineHeader height={50} py={6} px="sm">
            <Group position="right">
                <MantineTitle order={6}>{user?.name}</MantineTitle>
                <Avatar src={user?.avatar} alt={user?.name} radius="xl" />
            </Group>
        </MantineHeader>
    ) : null;
};
