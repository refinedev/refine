import { Box, Toolbar } from "@pankod/refine-mui";

type ContentProps = {
    drawerWidth: number;
};

export const Content: React.FC<ContentProps> = ({ drawerWidth, children }) => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
        >
            <Toolbar />
            {children}
        </Box>
    );
};
