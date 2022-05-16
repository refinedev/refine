import {
    Box,
    Button,
    Drawer,
    Link,
    MuiList,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@pankod/refine-mui";
import { ChevronLeft, ChevronRight, Send } from "@mui/icons-material";

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
    const { opened, setOpened, collapsed, setCollapsed } = useConfig();

    const getWidth = () => {
        if (collapsed) return "64px";
        return "256px";
    };

    return (
        <Drawer
            open={opened}
            onClose={() => setOpened(false)}
            variant="permanent"
        >
            <Box
                sx={{
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    width: getWidth(),
                }}
            >
                <Box
                    sx={{ flexGrow: 1, overflowX: "hidden", overflowY: "auto" }}
                >
                    <MuiList>
                        {list.map(({ primaryText, to }, i) => (
                            <ListItemButton
                                key={primaryText}
                                selected={i === 0}
                                component={to ? Link : "div"}
                                {...(!!to && { to })}
                                onClick={() => setOpened(false)}
                            >
                                <ListItemIcon>
                                    <Send />
                                </ListItemIcon>
                                <ListItemText
                                    primary={primaryText}
                                    primaryTypographyProps={{ noWrap: true }}
                                />
                            </ListItemButton>
                        ))}
                    </MuiList>
                </Box>
                <Button fullWidth onClick={() => setCollapsed((prev) => !prev)}>
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </Button>
            </Box>
        </Drawer>
    );
};
