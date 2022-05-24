import { createTheme, ThemeOptions } from "@mui/material";

import { lightPalette } from "./palette/lightPalette";
import { darkPalette } from "./palette/darkPalette";

import { typography } from "./typography";

const commonThemeProperties: ThemeOptions = {
    shape: {
        borderRadius: 6,
    },
    typography: {
        ...typography,
    },
};

const LightTheme = createTheme({
    ...commonThemeProperties,
    palette: lightPalette,
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorDefault: {
                    backgroundColor: "#fff",
                },
            },
        },
    },
});

const DarkTheme = createTheme({
    ...commonThemeProperties,
    palette: darkPalette,
});

export { LightTheme, DarkTheme };
