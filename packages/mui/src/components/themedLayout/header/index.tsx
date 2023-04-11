import React from "react";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import { AppBar, Stack, Toolbar, Typography, Avatar } from "@mui/material";

import { RefineThemedLayoutHeaderProps } from "../types";
import { ThemedHamburgerMenu } from "../hamburgerMenu";

export const ThemedHeader: React.FC<RefineThemedLayoutHeaderProps> = () => {
    const authProvider = useActiveAuthProvider();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    return (
        <AppBar position="sticky">
            <Toolbar>
                <ThemedHamburgerMenu />
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Stack
                        direction="row"
                        gap="16px"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            sx={{
                                display: { xs: "none", md: "block" },
                            }}
                            variant="subtitle2"
                        >
                            {user?.name}
                        </Typography>
                        <Avatar src={user?.avatar} alt={user?.name} />
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

(ThemedHeader as any).__Internal__HasHeaderWithThemedContext = true;
