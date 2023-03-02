import React from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { AppBar, Avatar, Stack, Toolbar, Typography } from "@pankod/refine-mui";

export const Header: React.FC = () => {
    const { data: user } = useGetIdentity();
    const showUserInfo = user && (user.name || user.avatar);

    return (
        <AppBar
            color="default"
            position="sticky"
            elevation={0}
            sx={{ background: "#fcfcf" }}
        >
            <Toolbar>
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    {showUserInfo && (
                        <Stack direction="row" gap="16px" alignItems="center">
                            {user.avatar && (
                                <Avatar src={user?.avatar} alt={user?.name} />
                            )}
                            {user.name && (
                                <Typography variant="subtitle2">
                                    {user?.name}
                                </Typography>
                            )}
                        </Stack>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
