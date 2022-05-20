import { AppBar, Toolbar } from "@pankod/refine-mui";

type HeaderProps = {
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
    drawerWidth: number;
};

export const Header: React.FC<HeaderProps> = ({ drawerWidth, children }) => {
    return (
        <AppBar position="fixed" elevation={1} sx={{ backgroundColor: "#fff" }}>
            <Toolbar
                sx={{
                    ml: { sm: `${drawerWidth}px` },
                    transition:
                        "margin-left 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                }}
            >
                {children}
            </Toolbar>
        </AppBar>
    );
};
