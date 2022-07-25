---
id: mui-custom-sider
title: Custom Sider
---

import customMenu from '@site/static/img/guides-and-concepts/hooks/useMenu/mui/custom-menu.gif';

import customMenuLogout from '@site/static/img/guides-and-concepts/hooks/useMenu/mui/custom-menu-logout.gif';

import customMobileMenu from '@site/static/img/guides-and-concepts/hooks/useMenu/mui/custom-menu-mobile.gif';

You can create a custom `<Sider />` component and use it either by passing it to [`<Refine />`][refine] or using a [Custom Layout][muicustomlayout].

## Recreating the Default Sider Menu

We will show you how to use `useMenu` to create a custom sider menu that is identical to default sider menu.

First we define `<CustomMenu>`:

```tsx title="src/CustomMenu.tsx"
import React, { useState } from "react";
import {
    CanAccess,
    ITreeMenu,
    useTitle,
    useMenu,
    useTranslate,
    useRouterContext,
    useRefineContext,
} from "@pankod/refine-core";
import {
    Box,
    Drawer,
    MuiList,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Tooltip,
    Button,
    Title as DefaultTitle,
} from "@pankod/refine-mui";
import {
    Dashboard,
    ListOutlined,
    ExpandLess,
    ExpandMore,
    ChevronLeft,
    ChevronRight,
} from "@mui/icons-material";

export const CustomMenu: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [opened, setOpened] = useState(false);

    const drawerWidth = () => {
        if (collapsed) return 64;
        return 200;
    };

    const t = useTranslate();

    const { Link } = useRouterContext();
    const { hasDashboard } = useRefineContext();

    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const Title = useTitle();

    const [open, setOpen] = useState<{ [k: string]: any }>({});

    React.useEffect(() => {
        setOpen((previousOpen) => {
            const previousOpenKeys: string[] = Object.keys(previousOpen);
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
                                <MuiList component="div" disablePadding>
                                    {renderTreeView(children, selectedKey)}
                                </MuiList>
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
                            to={route}
                            selected={isSelected}
                            onClick={() => {
                                setOpened(false);
                            }}
                            sx={{
                                pl: isNested ? 4 : 2,
                                py: isNested ? 1.25 : 1,
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
                        </ListItemButton>
                    </Tooltip>
                </CanAccess>
            );
        });
    };

    const drawer = (
        <MuiList disablePadding sx={{ mt: 1, color: "primary.contrastText" }}>
            {hasDashboard ? (
                <Tooltip
                    title={t("dashboard.title", "Dashboard")}
                    placement="right"
                    disableHoverListener={!collapsed}
                    arrow
                >
                    <ListItemButton
                        component={Link}
                        to="/"
                        selected={selectedKey === "/"}
                        onClick={() => {
                            setOpened(false);
                        }}
                        sx={{
                            pl: 2,
                            py: 1,
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
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText
                            primary={t("dashboard.title", "Dashboard")}
                            primaryTypographyProps={{
                                noWrap: true,
                                fontSize: "14px",
                                fontWeight:
                                    selectedKey === "/" ? "bold" : "normal",
                            }}
                        />
                    </ListItemButton>
                </Tooltip>
            ) : null}
            {renderTreeView(menuItems, selectedKey)}
        </MuiList>
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
                        // highlight-next-line
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
        </>
    );
};
```

`useMenu` hook is used to get style agnostic menu items. We render these items in the body of the sider. We create a recursive `renderTreeView` function to create menu items from the list of resources passed to `<Refine>`. We get the `Title` component with the `useTitle` hook.

<br />

:::tip
If you want to create a multi-level menu, you can take a look at this [`multi-level menu`](/docs/examples/multi-level-menu/multi-level-menu.md) example and also [`here`](/docs/guides-and-concepts/multi-level-menu/multi-level-menu.md) is the guide.
:::

We can override the default sider and show the custom menu we implemented in its place by passing a custom component to `<Refine>`s `Sider` prop:

```tsx title="App.tsx"
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList } from "pages/posts";

// highlight-next-line
import { CustomMenu } from "./CustomMenu";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            // highlight-next-line
            Sider={CustomMenu
            resources={[{ name: "posts", list: PostList }]}
        />
    );
};

export default App;
```

<div classname="img-container">
    <div classname="window">
        <div classname="control red"></div>
        <div classname="control orange"></div>
        <div classname="control green"></div>
    </div>
    <img src={customMenu} alt="Custom Menu" />
</div>

### Adding Logout Button

The `useLogout` hook allows us to add a Logout button to our menu if we have an authentication provider. When the Logout button is clicked, the `autProvider` will be invoked and the user will be logged out. This is a convenient way to provide a Logout button for our users without having to implement the logic ourselves.

```tsx title="src/CustomMenu.tsx"
// imports

    ...

export const CustomSider: React.FC = () => {
    import {
        ...
        // highlight-start
        useIsExistAuthentication,
        useLogout,
        // highlight-end
        ...
    } from "@pankod/refine-core";
    // highlight-start
    const isExistAuthentication = useIsExistAuthentication();
    const { mutate: logout } = useLogout();
    // highlight-end

    ...

    const drawer = (
        <MuiList disablePadding sx={{ mt: 1, color: "primary.contrastText" }}>
            {hasDashboard ? (
                <Tooltip
                    title={t("dashboard.title", "Dashboard")}
                    placement="right"
                    disableHoverListener={!collapsed}
                    arrow
                >
                    <ListItemButton
                        component={Link}
                        to="/"
                        selected={selectedKey === "/"}
                        onClick={() => {
                            setOpened(false);
                        }}
                        sx={{
                            pl: 2,
                            py: 1,
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
                            {<ListOutlined />}
                        </ListItemIcon>
                        <ListItemText
                            primary={t("dashboard.title", "Dashboard")}
                            primaryTypographyProps={{
                                noWrap: true,
                                fontSize: "14px",
                                fontWeight:
                                    selectedKey === "/" ? "bold" : "normal",
                            }}
                        />
                    </ListItemButton>
                </Tooltip>
            ) : null}
            {renderTreeView(menuItems, selectedKey)}
            // highlight-start
            {isExistAuthentication && (
                <Tooltip
                    title={t("buttons.logout", "Logout")}
                    placement="right"
                    disableHoverListener={!collapsed}
                    arrow
                >
                    <ListItemButton
                        key="logout"
                        // highlight-next-line
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
            // highlight-end
        </MuiList>
    );
    ...
};
```

<div classname="img-container">
    <div classname="window">
        <div classname="control red"></div>
        <div classname="control orange"></div>
        <div classname="control green"></div>
    </div>
    <img src={customMenuLogout} alt="Custom Menu Logout" />
</div>

<br />

### Mobile View of Sider

By adding another drawer that opens on mobile, we can make the user experience even better!

```tsx title="src/CustomMenu.tsx"
// imports
...

export const CustomSider: React.FC = () => {
    ...
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
                // highlight-start
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
                // highlight-end
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
                // highlight-start
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
                // highlight-end
            </Box>
        </>
    );
};
```

<div>
    <img src={customMobileMenu} alt="Custom Mobile Menu" />
</div>

`useLogout` provides the logout functionality.

:::caution
`useLogout` hook can only be used if the `authProvider` is provided.  
[Refer to authProvider docs for more detailed information. &#8594](/core/providers/auth-provider.md)  
[Refer to useLogout docs for more detailed information. &#8594](/core/hooks/auth/useLogout.md)
:::

:::tip

You can further customize the `<Sider>` and its appearance.  
Refer to Material UI docs for more detailed information about [Menu &#8594](https://mui.com/material-ui/react-menu) and [Drawer &#8594](https://mui.com/material-ui/react-drawer).

:::

[refine]: /core/components/refine-config.md
[muicustomlayout]: /ui-frameworks/mui/customization/layout.md
