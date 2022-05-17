import { AppBar, IconButton, Toolbar } from "@pankod/refine-mui";
import { ChevronLeft, ChevronRight, MenuRounded } from "@mui/icons-material";

import { useConfig } from "components/layout/context";

export const Header: React.FC = ({ children }) => {
    const { collapsed, setCollapsed, setOpened } = useConfig();

    const drawerWidth = () => {
        if (collapsed) return 64;
        return 256;
    };

    return (
        <AppBar
            color="default"
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth()}px)` },
                ml: { sm: `${drawerWidth()}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    sx={{ display: { xs: "none", sm: "flex" } }}
                    onClick={() => setCollapsed((prev) => !prev)}
                >
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </IconButton>
                <IconButton
                    edge="start"
                    sx={{ display: { sm: "none" } }}
                    onClick={() => setOpened((prev) => !prev)}
                >
                    <MenuRounded />
                </IconButton>
                {children}
            </Toolbar>
        </AppBar>
    );
};
