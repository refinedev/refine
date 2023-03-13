import {
    DarkTheme as DefaultDarkTheme,
    LightTheme as DefaultLightTheme,
} from "@refinedev/mui";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const LightTheme = createTheme({
    ...DefaultLightTheme,
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
});

const DarkTheme = createTheme({
    ...DefaultDarkTheme,
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
});

const DarkThemeWithResponsiveFontSizes = responsiveFontSizes(DarkTheme);
const LightThemeWithResponsiveFontSizes = responsiveFontSizes(LightTheme);

export { LightThemeWithResponsiveFontSizes, DarkThemeWithResponsiveFontSizes };
