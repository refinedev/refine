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
        <AppBar position="fixed" elevation={1} sx={{ backgroundColor: "#fff" }}>
            <Toolbar
                sx={{
                    ml: { sm: `${drawerWidth}px` },
                    transition:
                        "margin-left 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                }}
            >
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
