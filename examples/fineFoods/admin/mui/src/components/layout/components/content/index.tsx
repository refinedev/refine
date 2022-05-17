import { Box, Toolbar } from "@pankod/refine-mui";

import { useConfig } from "components/layout/context";

export const Content: React.FC = ({ children }) => {
    const { collapsed } = useConfig();

    const drawerWidth = () => {
        if (collapsed) return 64;
        return 256;
    };

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth()}px)` },
            }}
        >
            <Toolbar />
            {children}
        </Box>
    );
};
