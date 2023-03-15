import React from "react";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import { AppBar, Stack, Toolbar, Typography, Avatar } from "@mui/material";

import { RefineLayoutHeaderProps } from "../types";

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
    const authProvider = useActiveAuthProvider();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const shouldRenderHeader = user && (user.name || user.avatar);

    return shouldRenderHeader ? (
        <AppBar color="default" position="sticky" elevation={1}>
            <Toolbar>
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
                        <Typography variant="subtitle2">
                            {user?.name}
                        </Typography>
                        <Avatar src={user?.avatar} alt={user?.name} />
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    ) : null;
};
