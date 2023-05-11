import React from "react";
import {
    useGetIdentity,
    useActiveAuthProvider,
    pickNotDeprecated,
} from "@refinedev/core";
import { AppBar, Stack, Toolbar, Typography, Avatar } from "@mui/material";

import { RefineThemedLayoutV2HeaderProps } from "../types";
import { HamburgerMenu } from "../hamburgerMenu";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
    isSticky,
    sticky,
}) => {
    const authProvider = useActiveAuthProvider();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const prefferedSticky = pickNotDeprecated(sticky, isSticky) ?? true;

    return (
        <AppBar position={prefferedSticky ? "sticky" : "relative"}>
            <Toolbar>
                <HamburgerMenu />
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
