import { Box, Toolbar } from "@pankod/refine-mui";

export const Content: React.FC = ({ children }) => {
    return (
        <Box
            component="main"
            sx={{
                p: 3,
                minHeight: "100vh",
                width: "100%",
            }}
        >
            <Toolbar />
            {children}
        </Box>
    );
};
