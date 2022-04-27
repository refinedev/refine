import { createTheme } from "@mui/material";

import { lightPalette } from "./palette/lightPalette";
import { darkPalette } from "./palette/darkPalette";

import { typography } from "./typography";

const LightTheme = createTheme({
    palette: lightPalette,
    ...typography, // typography is a property of the theme
});

const DarkTheme = createTheme({
    palette: darkPalette,
    ...typography, // typography is a property of the theme
});

export { LightTheme, DarkTheme };
