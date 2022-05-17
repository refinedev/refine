import {
    Box,
    Drawer,
    Link,
    MuiList,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListItem,
} from "@pankod/refine-mui";
import { Send } from "@mui/icons-material";

import { useConfig } from "components/layout/context";

const list = [
    {
        primaryText: "My Files",
        icon: "folder",
        to: "/my-files",
    },
    {
        primaryText: "Shared with me",
        icon: "people",
        to: "/shared-with-me",
    },
    {
        primaryText: "Starred",
        icon: "star",
        to: "/starred",
    },
];

export const Sider: React.FC = () => {
    const { opened, setOpened, collapsed } = useConfig();

    const drawerWidth = () => {
        if (collapsed) return 64;
        return 256;
    };

    const drawer = (
        <MuiList>
            {list.map(({ primaryText, to }, i) => (
                <ListItem key={primaryText} disablePadding>
                    <ListItemButton
                        selected={i === 0}
                        component={to ? Link : "div"}
                    >
                        <ListItemIcon>
                            <Send />
                        </ListItemIcon>
                        <ListItemText
                            primary={primaryText}
                            primaryTypographyProps={{ noWrap: true }}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </MuiList>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth() }, flexShrink: { sm: 0 } }}
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
                        boxSizing: "border-box",
                        width: drawerWidth(),
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
                        boxSizing: "border-box",
                        width: drawerWidth(),
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};
