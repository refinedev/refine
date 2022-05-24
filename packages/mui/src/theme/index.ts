import { createTheme, ThemeOptions } from "@mui/material";

import { lightPalette } from "./palette/lightPalette";
import { darkPalette } from "./palette/darkPalette";

import { typography } from "./typography";

const commonThemeProperties: ThemeOptions = {
    shape: {
        borderRadius: 6,
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                color: "transparent",
            },
        },
        MuiTypography: {
            styleOverrides: {
                h5: {
                    fontWeight: 800,
                    lineHeight: "2rem",
                },
            },
        },
    },
    typography: {
        ...typography,
    },
};

const LightTheme = createTheme({
    timeLine: {
        color: {
            pending: "#fff7e6",
            ready: "#e6fffb",
            delivered: "#e6f7ff",
            cancelled: "#fff1f0",
            onTheWay: "#f6ffed",
        },
        dotColor: {
            pending: "#ffa940",
            ready: "#36cfc9",
            delivered: "#40a9ff",
            cancelled: "#ff4d4f",
            onTheWay: "#73d13d",
        },
    },
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
        MuiTypography: {
            styleOverrides: {
                h5: {
                    fontWeight: 800,
                    lineHeight: "2rem",
                },
            },
        },
    },
});

const DarkTheme = createTheme({
    timeLine: {
        color: {
            pending: "#f2a400",
            ready: "#00c2a2",
            delivered: "#0083c2",
            cancelled: "#c60d00",
            onTheWay: "#62c400",
        },
        dotColor: {
            pending: "#9f5700",
            ready: "#196966",
            delivered: "#00579f",
            cancelled: "#a60001",
            onTheWay: "#386d19",
        },
    },
    ...commonThemeProperties,
    palette: darkPalette,
});

export { LightTheme, DarkTheme };
