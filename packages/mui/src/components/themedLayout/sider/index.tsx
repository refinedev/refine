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
    IconButton,
} from "@mui/material";
import {
    ListOutlined,
    Logout,
    ExpandLess,
    ExpandMore,
    ChevronLeft,
    ChevronRight,
    MenuRounded,
    Dashboard,
} from "@mui/icons-material";
import {
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useLogout,
    useTitle,
    useTranslate,
    useRouterContext,
    useRouterType,
    useLink,
    useMenu,
    useRefineContext,
    useActiveAuthProvider,
    pickNotDeprecated,
} from "@refinedev/core";
import { RefineThemedLayoutSiderProps } from "../types";

import { ThemedTitle as DefaultTitle } from "@components";

export const ThemedSider: React.FC<RefineThemedLayoutSiderProps> = ({
    Title: TitleFromProps,
    render,
    meta,
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [opened, setOpened] = useState(false);

    const drawerWidth = () => {
        if (collapsed) return 64;
        return 200;
    };

    const t = useTranslate();
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;
    const { hasDashboard } = useRefineContext();
    const translate = useTranslate();

    const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta });
    const isExistAuthentication = useIsExistAuthentication();
    const TitleFromContext = useTitle();
    const authProvider = useActiveAuthProvider();
    const { mutate: mutateLogout } = useLogout({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const [open, setOpen] = useState<{ [k: string]: any }>({});

    React.useEffect(() => {
        setOpen((previous) => {
            const previousKeys: string[] = Object.keys(previous);
            const previousOpenKeys = previousKeys.filter(
                (key) => previous[key],
            );

            const uniqueKeys = new Set([
                ...previousOpenKeys,
                ...defaultOpenKeys,
            ]);
            const uniqueKeysRecord = Object.fromEntries(
                Array.from(uniqueKeys.values()).map((key) => [key, true]),
            );
            return uniqueKeysRecord;
        });
    }, [defaultOpenKeys]);

    const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle;

    const handleClick = (key: string) => {
        setOpen({ ...open, [key]: !open[key] });
    };

    const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
        return tree.map((item: ITreeMenu) => {
            const {
                icon,
                label,
                route,
                name,
                children,
                parentName,
                meta,
                options,
            } = item;
            const isOpen = open[item.key || ""] || false;

            const isSelected = item.key === selectedKey;
            const isNested = !(
                pickNotDeprecated(meta?.parent, options?.parent, parentName) ===
                undefined
            );

            if (children.length > 0) {
                return (
                    <CanAccess
                        key={item.key}
                        resource={name.toLowerCase()}
                        action="list"
                        params={{
                            resource: item,
                        }}
                    >
                        <div key={item.key}>
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
                                                handleClick(item.key || "");
                                            }
                                        } else {
                                            handleClick(item.key || "");
                                        }
                                    }}
                                    sx={{
                                        pl: isNested ? 4 : 2,
                                        justifyContent: "center",
                                        marginTop: "8px",
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            justifyContent: "center",
                                            minWidth: 36,
                                            color: "currentColor",
                                        }}
                                    >
                                        {icon ?? <ListOutlined />}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={label}
                                        primaryTypographyProps={{
                                            noWrap: true,
                                            fontSize: "14px",
                                        }}
                                    />
                                    {!collapsed &&
                                        (isOpen ? (
                                            <ExpandLess color="primary" />
                                        ) : (
                                            <ExpandMore color="primary" />
                                        ))}
                                </ListItemButton>
                            </Tooltip>
                            {!collapsed && (
                                <Collapse
                                    in={open[item.key || ""]}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List component="div" disablePadding>
                                        {renderTreeView(children, selectedKey)}
                                    </List>
                                </Collapse>
                            )}
                        </div>
                    </CanAccess>
                );
            }

            return (
                <CanAccess
                    key={item.key}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{ resource: item }}
                >
                    <Tooltip
                        title={label ?? name}
                        placement="right"
                        disableHoverListener={!collapsed}
                        arrow
                    >
                        <ListItemButton
                            component={ActiveLink}
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
                                    color: "currentColor",
                                }}
                            >
                                {icon ?? <ListOutlined />}
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{
                                    noWrap: true,
                                    fontSize: "14px",
                                }}
                            />
                        </ListItemButton>
                    </Tooltip>
                </CanAccess>
            );
        });
    };

    const dashboard = hasDashboard ? (
        <CanAccess resource="dashboard" action="list">
            <Tooltip
                title={translate("dashboard.title", "Dashboard")}
                placement="right"
                disableHoverListener={!collapsed}
                arrow
            >
                <ListItemButton
                    component={ActiveLink}
                    to="/"
                    selected={selectedKey === "/"}
                    onClick={() => {
                        setOpened(false);
                    }}
                    sx={{
                        pl: 2,
                        py: 1,
                        justifyContent: "center",
                    }}
                >
                    <ListItemIcon
                        sx={{
                            justifyContent: "center",
                            minWidth: 36,
                            fontSize: "14px",
                        }}
                    >
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText
                        primary={translate("dashboard.title", "Dashboard")}
                        primaryTypographyProps={{
                            noWrap: true,
                        }}
                    />
                </ListItemButton>
            </Tooltip>
        </CanAccess>
    ) : null;

    const logout = isExistAuthentication && (
        <Tooltip
            title={t("buttons.logout", "Logout")}
            placement="right"
            disableHoverListener={!collapsed}
            arrow
        >
            <ListItemButton
                key="logout"
                onClick={() => mutateLogout()}
                sx={{
                    justifyContent: "center",
                    marginTop: "8px",
                }}
            >
                <ListItemIcon
                    sx={{
                        justifyContent: "center",
                        minWidth: 36,
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
    );

    const items = renderTreeView(menuItems, selectedKey);

    const renderSider = () => {
        if (render) {
            return render({
                dashboard,
                logout,
                items,
                collapsed,
            });
        }
        return (
            <>
                {dashboard}
                {items}
                {logout}
            </>
        );
    };

    const drawer = (
        <List
            disablePadding
            sx={{
                flexGrow: 1,
            }}
        >
            {renderSider()}
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
                        display: {
                            sm: "block",
                            md: "none",
                        },
                    }}
                >
                    <Box
                        sx={{
                            height: 64,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                        }}
                    >
                        <RenderToTitle collapsed={false} />
                    </Box>
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
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
                            fontSize: "14px",
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
                            color: "primary",
                            textAlign: "center",
                            borderRadius: 0,
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
                        zIndex: 1199,
                        width: "36px",
                    }}
                >
                    <IconButton onClick={() => setOpened((prev) => !prev)}>
                        <MenuRounded />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
};
