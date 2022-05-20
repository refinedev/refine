import { AppBar, IconButton, Toolbar } from "@pankod/refine-mui";
import { ChevronLeft, ChevronRight, MenuRounded } from "@mui/icons-material";

type HeaderProps = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
    drawerWidth: number;
};

export const Header: React.FC<HeaderProps> = ({
    collapsed,
    setCollapsed,
    setOpened,
    drawerWidth,
    children,
}) => {
    return (
        <AppBar
            position="fixed"
            elevation={1}
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                backgroundColor: "#fff",
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
