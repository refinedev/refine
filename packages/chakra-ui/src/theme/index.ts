import {
    extendTheme,
    baseTheme,
    Theme,
    StyleFunctionProps,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const refineTheme = extendTheme({
    config: {
        initialColorMode: "system",
    },
    fonts: {
        heading:
            "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        body: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    },
    styles: {
        global: () => ({
            "html, body": {
                fontSize: "14px",
            },
        }),
    },
    colors: {
        sider: {
            background: "#2A132E",
            collapseButton: "#150A17",
        },
    },
});

const refineCustomColors = {
    header: {
        bg: {
            light: baseTheme.colors.white,
            dark: baseTheme.colors.gray[800],
        },
    },
    sider: {
        bg: {
            light: baseTheme.colors.white,
            dark: baseTheme.colors.gray[800],
        },
        header: {
            light: baseTheme.colors.white,
            dark: baseTheme.colors.gray[800],
        },
    },
} as const;

const refineCustomThemes = {
    Blue: baseTheme.colors.blue,
    Purple: baseTheme.colors.purple,
    Magenta: baseTheme.colors.pink,
    Red: baseTheme.colors.red,
    Orange: baseTheme.colors.orange,
    Yellow: baseTheme.colors.yellow,
    Green: baseTheme.colors.green,
};

export interface RefineTheme extends Omit<Theme, "colors"> {
    colors: Theme["colors"] & {
        brand: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        refine: typeof refineCustomColors;
    };
}

export const RefineThemes = Object.keys(refineCustomThemes).reduce(
    (acc, key) => {
        const themeName = key as keyof typeof refineCustomThemes;
        return {
            ...acc,
            [key]: extendTheme({
                config: {
                    initialColorMode: "system",
                },

                styles: {
                    global: (props: StyleFunctionProps) => {
                        const bgLight = props.theme.colors.gray[50];
                        const bgDark = props.theme.colors.gray[900];
                        return {
                            "html, body": {
                                background: mode(bgLight, bgDark)(props),
                            },
                        };
                    },
                },

                colors: {
                    brand: refineCustomThemes[themeName],
                    refine: {
                        ...refineCustomColors,
                    },
                },
            }),
        };
    },
    {},
) as Record<keyof typeof refineCustomThemes, RefineTheme>;
