import React from "react";

import {
    CanAccess,
    ITreeMenu,
    useMenu as useMenuCore,
    useRouterContext,
} from "@pankod/refine-core";
import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from "@mui/material";
import { ExpandLess, ExpandMore, ListOutlined } from "@mui/icons-material";

type useMenuReturnType = {
    defaultOpenKeys: Record<string, boolean>;
    selectedKey: string;
    menuItems: JSX.Element[];
    openKeys: Record<string, boolean>;
    setOpenKeys: (open: Record<string, boolean>) => void;
};

type handlerContextType = {
    item: ITreeMenu;
    openKeys: Record<string, boolean>;
    setOpenKeys: (open: Record<string, boolean>) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedKey?: string;
    collapsed: boolean;
    setCollapsed: (status: boolean) => void;
    Link: React.FC<any>;
    children?: (JSX.Element | null)[];
};

type useMenuConfigType = {
    collapsed: boolean;
    setCollapsed: (status: boolean) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    openKeys: Record<string, boolean>;
    setOpenKeys: (open: Record<string, boolean>) => void;
    handleSubMenuItem?: (context: handlerContextType) => JSX.Element | null;
    handleMenuItem?: (context: handlerContextType) => JSX.Element | null;
};

const defaultUseMenuConfig: useMenuConfigType = {
    open: false,
    collapsed: false,
    openKeys: {},
    setOpen: () => undefined,
    setOpenKeys: () => undefined,
    setCollapsed: () => undefined,
    handleSubMenuItem: function defaultHandleSubMenuItem({
        item,
        openKeys,
        setOpenKeys,
        selectedKey,
        collapsed,
        setCollapsed,
        children: renderedChildren,
    }) {
        const { icon, label, route, name, children, parentName } = item;
        const isOpen = openKeys[route || ""] || false;

        const isSelected = route === selectedKey;
        const isNested = !(parentName === undefined);

        const handleClick = (key: string) => {
            setOpenKeys({ ...openKeys, [key]: !openKeys[key] });
        };

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
                                "&.Mui-selected": {
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                    backgroundColor: "transparent",
                                },
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
                            {!collapsed &&
                                (isOpen ? <ExpandLess /> : <ExpandMore />)}
                        </ListItemButton>
                    </Tooltip>
                    {!collapsed && (
                        <Collapse
                            in={openKeys[route || ""]}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                {renderedChildren}
                            </List>
                        </Collapse>
                    )}
                </div>
            );
        }

        return null;
    },
    handleMenuItem: function defaultHandleMenuItem({
        item,
        Link,
        collapsed,
        setOpen,
        selectedKey,
    }) {
        const { icon, label, route, name, parentName } = item;

        const isSelected = route === selectedKey;
        const isNested = !(parentName === undefined);

        return (
            <CanAccess key={route} resource={name.toLowerCase()} action="list">
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
                            setOpen(false);
                        }}
                        sx={{
                            pl: isNested ? 4 : 2,
                            py: isNested ? 1.25 : 1,
                            "&.Mui-selected": {
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                                backgroundColor: "transparent",
                            },
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
    },
};

export const useMenu: (config?: useMenuConfigType) => useMenuReturnType = ({
    open,
    collapsed,
    setOpen,
    setCollapsed,
    handleMenuItem,
    handleSubMenuItem,
} = defaultUseMenuConfig) => {
    const {
        selectedKey,
        defaultOpenKeys: _defaultOpenKeys,
        menuItems,
    } = useMenuCore();
    const { Link } = useRouterContext();

    const defaultOpenKeys = React.useMemo(() => {
        let keys: Record<string, boolean> = {};
        let key = "";

        for (let index = 0; index < _defaultOpenKeys.length - 1; index++) {
            if (_defaultOpenKeys[index] !== "undefined") {
                key = key + `/${_defaultOpenKeys[index]}`;
            }

            keys = {
                ...keys,
                [key]: !keys[key],
            };
        }

        return keys;
    }, [_defaultOpenKeys]);

    const [openKeys, setOpenKeys] =
        React.useState<{ [k: string]: any }>(defaultOpenKeys);

    const renderTreeView = (
        tree: ITreeMenu[],
        selectedKey: string,
    ): (JSX.Element | null)[] => {
        return tree.map((item: ITreeMenu) => {
            if (item.children.length > 0) {
                return (
                    handleSubMenuItem?.({
                        item,
                        selectedKey,
                        open,
                        collapsed,
                        setOpen,
                        setCollapsed,
                        openKeys,
                        Link,
                        setOpenKeys,
                        children: renderTreeView(item.children, selectedKey),
                    }) ?? null
                );
            }

            return (
                handleMenuItem?.({
                    item,
                    selectedKey,
                    open,
                    collapsed,
                    setOpen,
                    setCollapsed,
                    openKeys,
                    Link,
                    setOpenKeys,
                }) ?? null
            );
        });
    };

    const values = React.useMemo(() => {
        return {
            selectedKey,
            menuItems: renderTreeView(menuItems, selectedKey).filter(
                Boolean,
            ) as JSX.Element[],
            defaultOpenKeys,
            openKeys,
            setOpenKeys,
        };
    }, [
        renderTreeView,
        selectedKey,
        defaultOpenKeys,
        openKeys,
        setOpenKeys,
        menuItems,
    ]);

    return values;
};
