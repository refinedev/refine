import React from "react";

import {
    useGetIdentity,
    useActiveAuthProvider,
} from "@refinedev/core";

import {
    Avatar,
    Flex,
    AppShell,
    Title,
} from "@mantine/core";

import { RefineThemedLayoutV2HeaderProps } from "../types";
import { HamburgerMenu } from "../hamburgerMenu";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({}) => {
    const authProvider = useActiveAuthProvider();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    return (
        <>
            <Flex
                align="center"
                justify="space-between"
                style={{
                    height: "100%",
                    padding: "0 10px"
                }}
            >
                <HamburgerMenu />

                <Flex align="center" gap="sm">
                    {user?.name && (
                        <Title order={6} data-testid="header-user-name">
                            {user?.name}
                        </Title>
                    )}
                    {user?.avatar && (
                        <Avatar
                            src={user?.avatar}
                            alt={user?.name}
                            radius="xl"
                        />
                    )}
                </Flex>
            </Flex>
        </>
    );
};
