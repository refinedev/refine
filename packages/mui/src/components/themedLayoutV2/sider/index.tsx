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
    IconButton,
    Paper,
} from "@mui/material";
import {
    ListOutlined,
    Logout,
    ExpandLess,
    ExpandMore,
    ChevronLeft,
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
    useWarnAboutChange,
} from "@refinedev/core";
import { RefineThemedLayoutV2SiderProps } from "../types";

import { ThemedTitleV2 as DefaultTitle } from "@components";
import { useSiderVisible } from "@hooks";

export const ThemedSiderV2: React.FC<RefineThemedLayoutV2SiderProps> = ({
    Title: TitleFromProps,
    render,
    meta,
}) => {
    const {
        siderVisible,
        setSiderVisible,
        drawerSiderVisible,
        setDrawerSiderVisible,
    } = useSiderVisible();

    const drawerWidth = () => {
        if (drawerSiderVisible) return 240;
        return 56;
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
    const { warnWhen, setWarnWhen } = useWarnAboutChange();
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
                                disableHoverListener={drawerSiderVisible}
                                arrow
                            >
                                <ListItemButton
                                    onClick={() => {
                                        if (!drawerSiderVisible) {
                                            setDrawerSiderVisible?.(true);
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
                                            minWidth: "24px",
                                            transition: "margin-right 0.3s",
                                            marginRight: drawerSiderVisible
                                                ? "12px"
                                                : "0px",
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
                                    {isOpen ? (
                                        <ExpandLess
                                            sx={{
                                                color: "text.icon",
                                            }}
                                        />
                                    ) : (
                                        <ExpandMore
                                            sx={{
                                                color: "text.icon",
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </Tooltip>
                            {drawerSiderVisible && (
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
                        disableHoverListener={drawerSiderVisible}
                        arrow
                    >
                        <ListItemButton
                            component={ActiveLink}
                            to={route}
                            selected={isSelected}
                            onClick={() => {
                                setSiderVisible?.(false);
                            }}
                            sx={{
                                pl: isNested ? 4 : 2,
                                py: isNested ? 1.25 : 1,
                                justifyContent: "center",
                                color: isSelected
                                    ? "primary.main"
                                    : "text.primary",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    justifyContent: "center",
                                    transition: "margin-right 0.3s",
                                    marginRight: drawerSiderVisible
                                        ? "12px"
                                        : "0px",
                                    minWidth: "24px",
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
                disableHoverListener={drawerSiderVisible}
                arrow
            >
                <ListItemButton
                    component={ActiveLink}
                    to="/"
                    selected={selectedKey === "/"}
                    onClick={() => {
                        setSiderVisible?.(false);
                    }}
                    sx={{
                        pl: 2,
                        py: 1,
                        justifyContent: "center",
                        color:
                            selectedKey === "/"
                                ? "primary.main"
                                : "text.primary",
                    }}
                >
                    <ListItemIcon
                        sx={{
                            justifyContent: "center",
                            minWidth: "24px",
                            transition: "margin-right 0.3s",
                            marginRight: drawerSiderVisible ? "12px" : "0px",
                            color: "currentColor",
                            fontSize: "14px",
                        }}
                    >
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText
                        primary={translate("dashboard.title", "Dashboard")}
                        primaryTypographyProps={{
                            noWrap: true,
                            fontSize: "14px",
                        }}
                    />
                </ListItemButton>
            </Tooltip>
        </CanAccess>
    ) : null;

    const handleLogout = () => {
        if (warnWhen) {
            const confirm = window.confirm(
                t(
                    "warnWhenUnsavedChanges",
                    "Are you sure you want to leave? You have unsaved changes.",
                ),
            );

            if (confirm) {
                setWarnWhen(false);
                mutateLogout();
            }
        } else {
            mutateLogout();
        }
    };

    const logout = isExistAuthentication && (
        <Tooltip
            title={t("buttons.logout", "Logout")}
            placement="right"
            disableHoverListener={drawerSiderVisible}
            arrow
        >
            <ListItemButton
                key="logout"
                onClick={() => handleLogout()}
                sx={{
                    justifyContent: "center",
                }}
            >
                <ListItemIcon
                    sx={{
                        justifyContent: "center",
                        minWidth: "24px",
                        transition: "margin-right 0.3s",
                        marginRight: drawerSiderVisible ? "12px" : "0px",
                        color: "currentColor",
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
                collapsed: !drawerSiderVisible,
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
                paddingTop: "16px",
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
                    elevation={2}
                    open={siderVisible}
                    onClose={() => setSiderVisible?.(false)}
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
                            width: drawerWidth(),
                        }}
                    >
                        <Box
                            sx={{
                                height: 64,
                                display: "flex",
                                alignItems: "center",
                                paddingLeft: "16px",
                                fontSize: "14px",
                            }}
                        >
                            <RenderToTitle collapsed={false} />
                        </Box>
                        {drawer}
                    </Box>
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth(),
                            overflow: "hidden",
                            transition:
                                "width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
                        },
                    }}
                    open
                >
                    <Paper
                        elevation={0}
                        sx={{
                            fontSize: "14px",
                            width: "100%",
                            height: 64,
                            display: "flex",
                            flexShrink: 0,
                            alignItems: "center",
                            justifyContent: !drawerSiderVisible
                                ? "center"
                                : "space-between",
                            paddingLeft: !drawerSiderVisible ? 0 : "16px",
                            paddingRight: !drawerSiderVisible ? 0 : "8px",
                            variant: "outlined",
                            borderRadius: 0,
                            borderBottom: (theme) =>
                                `1px solid ${theme.palette.action.focus}`,
                        }}
                    >
                        <RenderToTitle collapsed={!drawerSiderVisible} />
                        {drawerSiderVisible && (
                            <IconButton
                                size="small"
                                onClick={() => setDrawerSiderVisible?.(false)}
                            >
                                {<ChevronLeft />}
                            </IconButton>
                        )}
                    </Paper>
                    <Box
                        sx={{
                            flexGrow: 1,
                            overflowX: "hidden",
                            overflowY: "auto",
                        }}
                    >
                        {drawer}
                    </Box>
                </Drawer>
            </Box>
        </>
    );
};
