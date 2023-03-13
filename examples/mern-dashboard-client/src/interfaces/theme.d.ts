/*eslint-disable */
import "@pankod/refine-mui";
export interface CustomTheme {
    // Add custom variables here like below:
    // status: {
    //   danger: string;
    // };
}

declare module "@pankod/refine-mui" {
    // @ts-ignore
    interface Theme extends import("@pankod/refine-mui").Theme, CustomTheme {}
    interface ThemeOptions
        // @ts-ignore
        extends import("@pankod/refine-mui").ThemeOptions,
            CustomTheme {}
}
/*eslint-enable */
