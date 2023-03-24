import React from "react";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import {
    AppBar,
    Stack,
    Toolbar,
    Typography,
    Avatar,
    IconButton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

import { RefineThemedLayoutHeaderProps } from "../types";

export const ThemedHeader: React.FC<RefineThemedLayoutHeaderProps> = ({
    isSiderOpen,
    onToggleSiderClick,
    toggleSiderIcon: toggleSiderIconFromProps,
}) => {
    const authProvider = useActiveAuthProvider();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const hasSidebarToggle = Boolean(onToggleSiderClick);

    return (
        <AppBar position="sticky">
            <Toolbar>
                {hasSidebarToggle && (
                    <IconButton
                        aria-label="open drawer"
                        onClick={() => onToggleSiderClick?.()}
                        edge="start"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            ...(isSiderOpen && { display: "none" }),
                        }}
                    >
                        {toggleSiderIconFromProps?.(Boolean(isSiderOpen)) ?? (
                            <Menu />
                        )}
                    </IconButton>
                )}
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
    );
};
