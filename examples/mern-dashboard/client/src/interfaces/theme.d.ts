/*eslint-disable */
import "@pankod/refine-mui";
export interface CustomTheme {
    // Add custom variables here like below:
    // status: {
    //   danger: string;
    // };
}

declare module "@pankod/refine-mui" {
    // eslint-disable-next-line no-use-before-define
    // @ts-ignore
    interface Theme extends import("@pankod/refine-mui").Theme, CustomTheme {}
    interface ThemeOptions
        // eslint-disable-next-line
        // @ts-ignore
        extends import("@pankod/refine-mui").ThemeOptions,
            CustomTheme {}
}
/*eslint-enable */
