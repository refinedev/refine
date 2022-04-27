import React, { useState } from "react";
import {
    Toolbar,
    IconButton,
    Divider,
    List,
    Collapse,
    ListItemIcon,
    ListItemText,
    ListItem,
    ListItemButton,
} from "@mui/material";
import {
    useTranslate,
    useLogout,
    useNavigation,
    CanAccess,
    ITreeMenu,
    useTitle,
    useIsExistAuthentication,
} from "@pankod/refine-core";
import {
    ChevronLeft,
    ListOutlined,
    Logout,
    ExpandLess,
    ExpandMore,
} from "@mui/icons-material";
import { useMenu } from "@hooks";
import { Title as DefaultTitle } from "@components";

import { Drawer } from "./styled";

type SiderProps = {
    drawerOpen: boolean;
    toggleDrawer: () => void;
};

export const Sider: React.FC<SiderProps> = ({ drawerOpen, toggleDrawer }) => {
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const Title = useTitle();

    const RenderToTitle = Title ?? DefaultTitle;
    const [open, setOpen] = useState<{ [k: string]: any }>(defaultOpenKeys);
    const isExistAuthentication = useIsExistAuthentication();
    const { push } = useNavigation();
    const { mutate: logout } = useLogout();
    const translate = useTranslate();

    const handleClick = (key: string) => {
        setOpen({ ...open, [key]: !open[key] });
    };

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children, parentName } = item;
            const isOpen = open[route || ""] || false;

            if (children.length > 0) {
                return (
                    <div key={route}>
                        <ListItem
                            button
                            onClick={() => handleClick(route || "")}
                            sx={{
                                "&:hover": {
                                    backgroundColor: (theme) =>
                                        theme.palette.primary.main,
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: "auto" }}>
                                {icon ?? (
                                    <ListOutlined
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.common.white,
                                        }}
                                    />
                                )}
                            </ListItemIcon>
                            {drawerOpen && (
                                <ListItemText
                                    inset
                                    primary={label}
                                    sx={{
                                        pl: 1,
                                    }}
                                />
                            )}
                            {isOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={open[route || ""]}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                {renderTreeView(children, selectedKey)}
                            </List>
                        </Collapse>
                    </div>
                );
            }
            const isSelected = route === selectedKey;
            const isRoute = !(
                parentName !== undefined && children.length === 0
            );
            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                >
                    <ListItemButton
                        onClick={() => {
                            push(route ?? "");
                        }}
                        selected={isSelected}
                        sx={{
                            pl: isRoute ? 2 : 4,
                            "&:hover": {
                                backgroundColor: (theme) =>
                                    theme.palette.primary.main,
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: "auto" }}>
                            {icon ?? (
                                <ListOutlined
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.common.white,
                                    }}
                                />
                            )}
                        </ListItemIcon>
                        {drawerOpen && (
                            <ListItemText
                                inset
                                primary={label}
                                sx={{ pl: 1 }}
                            />
                        )}
                    </ListItemButton>
                </CanAccess>
            );
        });
    };

    return (
        <Drawer open={drawerOpen}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    px: [1],
                }}
            >
                <RenderToTitle collapsed={false} />
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeft
                        sx={{ color: (theme) => theme.palette.common.white }}
                    />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav" aria-labelledby="nested-list-subheader">
                {renderTreeView(menuItems, selectedKey)}
                {isExistAuthentication && (
                    <ListItemButton
                        key="logout"
                        onClick={() => logout()}
                        sx={{
                            "&:hover": {
                                backgroundColor: (theme) =>
                                    theme.palette.primary.main,
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: (theme) => theme.palette.common.white,
                                minWidth: "auto",
                            }}
                        >
                            <Logout />
                        </ListItemIcon>
                        {drawerOpen && (
                            <ListItemText
                                inset
                                primary={translate("buttons.logout", "Logout")}
                                sx={{ pl: 1 }}
                            />
                        )}
                    </ListItemButton>
                )}
            </List>
        </Drawer>
    );
};
