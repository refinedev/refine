import { useState } from "react";
import {
    Box,
    Drawer,
    MuiList,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMenu,
    Collapse,
    Tooltip,
    Button,
} from "@pankod/refine-mui";
import {
    ListOutlined,
    Logout,
    ExpandLess,
    ExpandMore,
} from "@mui/icons-material";
import {
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useLogout,
    useNavigation,
    useTitle,
    useTranslate,
} from "@pankod/refine-core";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

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
    const { push } = useNavigation();
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
                                    color: "#fff",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        justifyContent: "center",
                                        minWidth: 36,
                                        color: "#fff",
                                    }}
                                >
                                    {icon ?? <ListOutlined />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={label}
                                    primaryTypographyProps={{ noWrap: true }}
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
                            selected={isSelected}
                            onClick={() => {
                                setOpened(false);
                                push(route ?? "");
                            }}
                            sx={{
                                pl: isNested ? 4 : 2,
                                py: isNested ? 1.25 : 1,
                                justifyContent: "center",
                                color: "#fff",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    justifyContent: "center",
                                    minWidth: 36,
                                    color: "#fff",
                                }}
                            >
                                {icon ?? <ListOutlined />}
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{ noWrap: true }}
                            />
                        </ListItemButton>
                    </Tooltip>
                </CanAccess>
            );
        });
    };

    const drawer = (
        <MuiList disablePadding sx={{ mt: 1 }}>
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
                        sx={{ justifyContent: "center", color: "#fff" }}
                    >
                        <ListItemIcon
                            sx={{
                                justifyContent: "center",
                                minWidth: 36,
                                color: "#fff",
                            }}
                        >
                            <Logout />
                        </ListItemIcon>
                        <ListItemText
                            primary={t("buttons.logout", "Logout")}
                            primaryTypographyProps={{ noWrap: true }}
                        />
                    </ListItemButton>
                </Tooltip>
            )}
        </MuiList>
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
                        bgcolor: "#2a132e",
                    },
                }}
            >
                <Box sx={{ height: 64, display: "flex", alignItems: "center" }}>
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
                        bgcolor: "#2a132e",
                        overflow: "hidden",
                        transition:
                            "width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
                    },
                }}
                open
            >
                <Box sx={{ height: 64, display: "flex", alignItems: "center" }}>
                    <RenderToTitle collapsed={collapsed} />
                </Box>
                <Box
                    sx={{ flexGrow: 1, overflowX: "hidden", overflowY: "auto" }}
                >
                    {drawer}
                </Box>
                <Button
                    sx={{
                        color: "#fff",
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
