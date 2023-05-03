import { useContext } from "react";
import { AppBar, Box, IconButton, Stack } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

import { ColorModeContext } from "../contexts";

export const Header: React.FC = () => {
    const { mode, setMode } = useContext(ColorModeContext);
    return (
        <AppBar color="default" position="sticky">
            <Stack width="100%" direction="row" justifyContent="end">
                <Box marginRight="20px">
                    <IconButton
                        onClick={() => {
                            setMode();
                        }}
                    >
                        {mode === "dark" ? (
                            <LightModeOutlined />
                        ) : (
                            <DarkModeOutlined />
                        )}
                    </IconButton>
                </Box>
            </Stack>
        </AppBar>
    );
};
