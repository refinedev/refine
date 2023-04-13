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

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/mui/components/mui-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
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
                        color="inherit"
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
