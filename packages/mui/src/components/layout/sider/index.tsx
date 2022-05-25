import React, { useState } from "react";
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Tooltip,
    Button,
} from "@mui/material";
import {
    ListOutlined,
    Logout,
    ExpandLess,
    ExpandMore,
    ChevronLeft,
    ChevronRight,
} from "@mui/icons-material";
import {
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useLogout,
    useTitle,
    useTranslate,
    useRouterContext,
} from "@pankod/refine-core";

import { useMenu } from "@hooks";
import { Title as DefaultTitle } from "../title";

type SiderProps = {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    drawerWidth: number;
};

export const Sider: React.FC<SiderProps> = ({
    opened,
    setOpened,
    collapsed,
    setCollapsed,
    drawerWidth,
}) => {
    const t = useTranslate();
    const { Link } = useRouterContext();

    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const isExistAuthentication = useIsExistAuthentication();
    const { mutate: logout } = useLogout();
    const Title = useTitle();

    const [open, setOpen] = useState<{ [k: string]: any }>(defaultOpenKeys);

    const RenderToTitle = Title ?? DefaultTitle;

    const handleClick = (key: string) => {
        setOpen({ ...open, [key]: !open[key] });
    };

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children, parentName } = item;
            const isOpen = open[route || ""] || false;

            const isSelected = route === selectedKey;
            const isNested = !(parentName === undefined);

            if (children.length > 0) {
                return (
                    <div key={route}>
                        <Tooltip
                            title={label ?? name}
                            placement="right"
                            disableHoverListener={!collapsed}
                            arrow
                        >
                            <ListItemButton
                                onClick={() => {
                                    if (collapsed) {
                                        setCollapsed(false);
                                        if (!isOpen) {
                                            handleClick(route || "");
                                        }
                                    } else {
                                        handleClick(route || "");
                                    }
                                }}
                                sx={{
                                    pl: isNested ? 4 : 2,
                                    justifyContent: "center",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        justifyContent: "center",
                                        minWidth: 36,
                                        color: "primary.contrastText",
                                    }}
                                >
                                    {icon ?? <ListOutlined />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={label}
                                    primaryTypographyProps={{
                                        noWrap: true,
                                        fontSize: "14px",
                                        fontWeight: isSelected
                                            ? "bold"
                                            : "normal",
                                    }}
                                />
                                {!collapsed &&
                                    (isOpen ? <ExpandLess /> : <ExpandMore />)}
                            </ListItemButton>
                        </Tooltip>
                        {!collapsed && (
                            <Collapse
                                in={open[route || ""]}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding>
                                    {renderTreeView(children, selectedKey)}
                                </List>
                            </Collapse>
                        )}
                    </div>
                );
            }

            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                >
                    <Tooltip
                        title={label ?? name}
                        placement="right"
                        disableHoverListener={!collapsed}
                        arrow
                    >
                        <ListItemButton
                            component={Link}
                            href={route}
                            to={route}
                            selected={isSelected}
                            onClick={() => {
                                setOpened(false);
                            }}
                            sx={{
                                pl: isNested ? 4 : 2,
                                py: isNested ? 1.25 : 1,
                                justifyContent: "center",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    justifyContent: "center",
                                    minWidth: 36,
                                    color: "primary.contrastText",
                                }}
                            >
                                {icon ?? <ListOutlined />}
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{
                                    noWrap: true,
                                    fontSize: "14px",
                                    fontWeight: isSelected ? "bold" : "normal",
                                }}
                            />
                        </ListItemButton>
                    </Tooltip>
                </CanAccess>
            );
        });
    };

    const drawer = (
        <List disablePadding sx={{ mt: 1, color: "primary.contrastText" }}>
            {renderTreeView(menuItems, selectedKey)}
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
        <Box
            component="nav"
            sx={{
                position: "fixed",
                zIndex: 1101,
                width: { sm: drawerWidth },
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
                    display: { xs: "block", sm: "none" },
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
                    display: { xs: "none", sm: "block" },
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
                    sx={{ flexGrow: 1, overflowX: "hidden", overflowY: "auto" }}
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
        </Box>
    );
};
