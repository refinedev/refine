import React from "react";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import {
    AppBar,
    Stack,
    Toolbar,
    Typography,
    Avatar,
    IconButton,
    ExtendButtonBase,
    IconButtonTypeMap,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

import { useSiderVisible } from "@hooks";
import { RefineThemedLayoutHeaderProps } from "../types";

const HamburgerIcon: ExtendButtonBase<IconButtonTypeMap<{}, "button">> = (
    props: React.PropsWithChildren,
) => (
    <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        {...props}
    >
        <Menu />
    </IconButton>
);

export const ThemedHeader: React.FC<RefineThemedLayoutHeaderProps> = () => {
    const authProvider = useActiveAuthProvider();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
    const {
        siderVisible,
        setSiderVisible,
        drawerSiderVisible,
        setDrawerSiderVisible,
    } = useSiderVisible();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <HamburgerIcon
                    onClick={() => setDrawerSiderVisible?.(!drawerSiderVisible)}
                    sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        ...(drawerSiderVisible && { display: "none" }),
                    }}
                />
                <HamburgerIcon
                    onClick={() => setSiderVisible?.(!siderVisible)}
                    sx={{
                        mr: 2,
                        display: { xs: "flex", md: "none" },
                        ...(siderVisible && { display: "none" }),
                    }}
                />
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
