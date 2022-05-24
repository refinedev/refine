import "@pankod/refine-mui";

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

declare module "@pankod/refine-mui" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Theme extends import("@pankod/refine-mui").Theme, CustomTheme {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ThemeOptions
        extends import("@pankod/refine-mui").ThemeOptions,
            CustomTheme {}
}
