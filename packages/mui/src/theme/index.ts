import { createTheme } from "@mui/material";

import { lightPalette } from "./palette/lightPalette";
import { darkPalette } from "./palette/darkPalette";

import { typography } from "./typography";

const LightTheme = createTheme({
    palette: lightPalette,
    shape: {
        borderRadius: 6,
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                color: "transparent",
            },
        },
    },
    typography: {
        ...typography,
    },
});

const DarkTheme = createTheme({
    palette: darkPalette,
    shape: {
        borderRadius: 6,
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                color: "transparent",
            },
        },
    },
    typography: {
        ...typography,
    },
});

export { LightTheme, DarkTheme };
