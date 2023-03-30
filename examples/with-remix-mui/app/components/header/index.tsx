import { DarkModeOutlined, LightModeOutlined, Menu } from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    IconButton,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import { useGetIdentity } from "@refinedev/core";
import { RefineThemedLayoutHeaderProps } from "@refinedev/mui";
import React, { useContext } from "react";
import { ColorModeContext } from "~/contexts/ColorModeContext";

type IUser = {
    id: number;
    name: string;
    avatar: string;
};

export const Header: React.FC<RefineThemedLayoutHeaderProps> = ({
    isSiderOpen,
    onToggleSiderClick,
    toggleSiderIcon: toggleSiderIconFromProps,
}) => {
    const { mode, setMode } = useContext(ColorModeContext);

    const { data: user } = useGetIdentity<IUser>();

    const hasSidebarToggle = Boolean(onToggleSiderClick);

    return (
        <AppBar color="default" position="sticky">
            <Toolbar>
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="flex-end"
                    alignItems="center"
                >
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
                            {toggleSiderIconFromProps?.(
                                Boolean(isSiderOpen),
                            ) ?? <Menu />}
                        </IconButton>
                    )}

                    <Stack
                        direction="row"
                        width="100%"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <IconButton
                            onClick={() => {
                                setMode();
                            }}
                        >
                            {mode === "dark" ? (
                                <LightModeOutlined />
                            ) : (
                                <DarkModeOutlined />
                            )}
                        </IconButton>

                        {(user?.avatar || user?.name) && (
                            <Stack
                                direction="row"
                                gap="16px"
                                alignItems="center"
                                justifyContent="center"
                            >
                                {user?.name && (
                                    <Typography variant="subtitle2">
                                        {user?.name}
                                    </Typography>
                                )}
                                <Avatar src={user?.avatar} alt={user?.name} />
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
