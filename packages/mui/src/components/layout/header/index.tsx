import React from "react";
import { useGetIdentity, useTitle } from "@pankod/refine-core";
import { Toolbar, IconButton, Stack, Avatar, Typography } from "@mui/material";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { ChevronRight } from "@mui/icons-material";
import { Title as DefaultTitle } from "@components";

import { AppBar } from "./styled";

interface HeaderProps extends MuiAppBarProps {
    drawerOpen?: boolean;
    toggleDrawer?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ drawerOpen, toggleDrawer }) => {
    const { data: user } = useGetIdentity();
    const Title = useTitle();
    const RenderToTitle = Title ?? DefaultTitle;

    return (
        <AppBar position="absolute" drawerOpen={drawerOpen}>
            <Toolbar
                sx={{
                    pr: "24px",
                    flexDirection: "row",
                }}
            >
                <IconButton
                    edge="start"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: "36px",
                        color: (theme) => theme.palette.common.white,
                        ...(drawerOpen && { display: "none" }),
                    }}
                >
                    <Stack direction="row" spacing={1}>
                        <RenderToTitle collapsed={true} />
                        <ChevronRight
                            sx={{
                                color: (theme) => theme.palette.common.white,
                            }}
                        />
                    </Stack>
                </IconButton>
                <div
                    style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "flex-end",
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {user?.name && (
                            <Typography
                                sx={{
                                    color: (theme) =>
                                        theme.palette.common.white,
                                }}
                            >
                                {user.name}
                            </Typography>
                        )}
                        {user?.avatar && (
                            <Avatar src={user.avatar} alt={user?.name} />
                        )}
                    </Stack>
                </div>
            </Toolbar>
        </AppBar>
    );
};
