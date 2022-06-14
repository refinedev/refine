import React, { useState } from "react";
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Button,
    IconButton,
} from "@mui/material";
import {
    Logout,
    ChevronLeft,
    ChevronRight,
    MenuRounded,
} from "@mui/icons-material";
import {
    useIsExistAuthentication,
    useLogout,
    useTitle,
    useTranslate,
} from "@pankod/refine-core";

import { useMenu } from "@hooks";
import { Title as DefaultTitle } from "../title";

export const Sider: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [opened, setOpened] = useState(false);

    const drawerWidth = () => {
        if (collapsed) return 64;
        return 200;
    };

    const t = useTranslate();

    const { menuItems } = useMenu();
    const isExistAuthentication = useIsExistAuthentication();
    const { mutate: logout } = useLogout();
    const Title = useTitle();

    const RenderToTitle = Title ?? DefaultTitle;

    const drawer = (
        <List disablePadding sx={{ mt: 1, color: "primary.contrastText" }}>
            {menuItems}
            {isExistAuthentication && (
                <Tooltip
                    title={t("buttons.logout", "Logout")}
                    placement="right"
                    disableHoverListener={!collapsed}
                    arrow
                >
                    <ListItemButton
                        key="logout"
                        onClick={() => logout()}
                        sx={{ justifyContent: "center" }}
                    >
                        <ListItemIcon
                            sx={{
                                justifyContent: "center",
                                minWidth: 36,
                                color: "primary.contrastText",
                            }}
                        >
                            <Logout />
                        </ListItemIcon>
                        <ListItemText
                            primary={t("buttons.logout", "Logout")}
                            primaryTypographyProps={{
                                noWrap: true,
                                fontSize: "14px",
                            }}
                        />
                    </ListItemButton>
                </Tooltip>
            )}
        </List>
    );

    return (
        <>
            <Box
                sx={{
                    width: { xs: drawerWidth() },
                    display: {
                        xs: "none",
                        md: "block",
                    },
                    transition: "width 0.3s ease",
                }}
            />
            <Box
                component="nav"
                sx={{
                    position: "fixed",
                    zIndex: 1101,
                    width: { sm: drawerWidth() },
                    display: "flex",
                }}
            >
                <Drawer
                    variant="temporary"
                    open={opened}
                    onClose={() => setOpened(false)}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { sm: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            width: 256,
                            bgcolor: "secondary.main",
                        },
                    }}
                >
                    <Box
                        sx={{
                            height: 64,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <RenderToTitle collapsed={false} />
                    </Box>
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    PaperProps={{ elevation: 1 }}
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            bgcolor: "secondary.main",
                            overflow: "hidden",
                            transition:
                                "width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
                        },
                    }}
                    open
                >
                    <Box
                        sx={{
                            height: 64,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <RenderToTitle collapsed={collapsed} />
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            overflowX: "hidden",
                            overflowY: "auto",
                        }}
                    >
                        {drawer}
                    </Box>
                    <Button
                        sx={{
                            background: "rgba(0,0,0,.5)",
                            color: "primary.contrastText",
                            textAlign: "center",
                            borderRadius: 0,
                            borderTop: "1px solid #ffffff1a",
                        }}
                        fullWidth
                        size="large"
                        onClick={() => setCollapsed((prev) => !prev)}
                    >
                        {collapsed ? <ChevronRight /> : <ChevronLeft />}
                    </Button>
                </Drawer>
                <Box
                    sx={{
                        display: { xs: "block", md: "none" },
                        position: "fixed",
                        top: "64px",
                        left: "0px",
                        borderRadius: "0 6px 6px 0",
                        bgcolor: "secondary.main",
                        zIndex: 1199,
                        width: "36px",
                    }}
                >
                    <IconButton
                        sx={{ color: "#fff", width: "36px" }}
                        onClick={() => setOpened((prev) => !prev)}
                    >
                        <MenuRounded />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
};
