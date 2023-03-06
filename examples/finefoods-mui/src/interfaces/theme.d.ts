import "@refinedev/mui";

export interface CustomTheme {
    timeLine: {
        color: {
            pending: string;
            ready: string;
            delivered: string;
            cancelled: string;
            onTheWay: string;
        };
        dotColor: {
            pending: string;
            ready: string;
            delivered: string;
            cancelled: string;
            onTheWay: string;
        };
    };
}

declare module "@mui/material/styles" {
    interface Theme extends import("@mui/material/styles").Theme, CustomTheme {}
    interface ThemeOptions
        extends import("@mui/material/styles").ThemeOptions,
            CustomTheme {}
}
