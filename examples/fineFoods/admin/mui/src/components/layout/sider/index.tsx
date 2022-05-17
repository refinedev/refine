import { useState } from "react";
import {
    Box,
    Drawer,
    MuiList,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListItem,
    useMenu,
    Collapse,
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
    useTranslate,
} from "@pankod/refine-core";

type SiderProps = {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
    drawerWidth: number;
};

export const Sider: React.FC<SiderProps> = ({
    opened,
    setOpened,
    drawerWidth,
}) => {
    const t = useTranslate();
    const { push } = useNavigation();
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
    const isExistAuthentication = useIsExistAuthentication();
    const { mutate: logout } = useLogout();

    const [open, setOpen] = useState<{ [k: string]: any }>(defaultOpenKeys);

    const handleClick = (key: string) => {
        setOpen({ ...open, [key]: !open[key] });
    };

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children } = item;
            const isOpen = open[route || ""] || false;

            if (children.length > 0) {
                return (
                    <div key={route}>
                        <ListItem
                            button
                            onClick={() => handleClick(route || "")}
                        >
                            <ListItemIcon>
                                {icon ?? <ListOutlined />}
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{ noWrap: true }}
                            />
                            {isOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={open[route || ""]}
                            timeout="auto"
                            unmountOnExit
                        >
                            <MuiList component="div" disablePadding>
                                {renderTreeView(children, selectedKey)}
                            </MuiList>
                        </Collapse>
                    </div>
                );
            }
            const isSelected = route === selectedKey;

            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                >
                    <ListItemButton
                        selected={isSelected}
                        onClick={() => {
                            setOpened(false);
                            push(route ?? "");
                        }}
                    >
                        <ListItemIcon>{icon ?? <ListOutlined />}</ListItemIcon>
                        <ListItemText
                            primary={label}
                            primaryTypographyProps={{ noWrap: true }}
                        />
                    </ListItemButton>
                </CanAccess>
            );
        });
    };

    const drawer = (
        <MuiList disablePadding>
            {renderTreeView(menuItems, selectedKey)}
            {isExistAuthentication && (
                <ListItemButton key="logout" onClick={() => logout()}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText
                        primary={t("buttons.logout", "Logout")}
                        primaryTypographyProps={{ noWrap: true }}
                    />
                </ListItemButton>
            )}
        </MuiList>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
                    },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};
