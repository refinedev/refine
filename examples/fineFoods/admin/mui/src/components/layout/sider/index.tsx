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
                                    handleClick(route || "");
                                    if (collapsed) {
                                        setCollapsed(false);
                                    }
                                }}
                                sx={{
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
                                pl: isRoute ? 2 : 4,
                                py: isRoute ? 1 : 1.25,
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
                width: { sm: drawerWidth },
                flexShrink: { sm: 0 },
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
                    },
                }}
                open
            >
                <Box sx={{ height: 64, display: "flex", alignItems: "center" }}>
                    <RenderToTitle collapsed={collapsed} />
                </Box>
                {drawer}
            </Drawer>
        </Box>
    );
};
