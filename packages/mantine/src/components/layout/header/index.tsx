import React from "react";

import { ThemedLayoutContext } from "@contexts";

import {
    useGetIdentity,
    useActiveAuthProvider,
    pickNotDeprecated,
} from "@refinedev/core";
import {
    Avatar,
    Flex,
    AppShell,
    Burger,
    Title,
    useMantineTheme,
} from "@mantine/core";

import { RefineLayoutHeaderProps } from "../types";

import { useThemedLayoutContext } from "@hooks";

export const Header: React.FC<RefineLayoutHeaderProps> = ({}) => {
    const theme = useMantineTheme();

    const { siderCollapsed, mobileSiderOpen, setMobileSiderOpen } =
        useThemedLayoutContext();

    const authProvider = useActiveAuthProvider();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const shouldRenderHeader = user && (user.name || user.avatar);

    return shouldRenderHeader ? (
        <>
            <Burger
                opened={mobileSiderOpen}
                onClick={() => setMobileSiderOpen(!mobileSiderOpen)}
                hiddenFrom="sm"
                size="sm"
            />
            <Flex align="center" gap="sm">
                <Title order={6} data-testid="header-user-name">
                    {user?.name}
                </Title>
                <Avatar
                    src={user?.avatar}
                    alt={user?.name}
                    radius="xl"
                />
            </Flex>
        </>
    ) : null;
};
