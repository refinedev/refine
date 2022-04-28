import { createTheme } from "@mui/material";

import { lightPalette } from "./palette/lightPalette";
import { darkPalette } from "./palette/darkPalette";

import { typography } from "./typography";

const LightTheme = createTheme({
    palette: lightPalette,
    typography: {
        ...typography,
    },
});

const DarkTheme = createTheme({
    palette: darkPalette,
    typography: {
        ...typography,
    },
});

export { LightTheme, DarkTheme };
