import "@mui/material/styles";
// import "@pankod/refine-mui";

export interface CustomTheme {
    timeLine?: {
        color?: {
            pending?: string;
            ready?: string;
            delivered?: string;
            cancelled?: string;
            onTheWay?: string;
        };
        dotColor?: {
            pending?: string;
            ready?: string;
            delivered?: string;
            cancelled?: string;
            onTheWay?: string;
        };
    };
}

declare module "@mui/material/styles" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Theme extends CustomTheme {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ThemeOptions extends CustomTheme {}
}

declare module "@mui/system" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Theme extends CustomTheme {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ThemeOptions extends CustomTheme {}
}
