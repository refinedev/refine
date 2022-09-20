import { MantineTheme } from "@mantine/core";

const commonThemeProperties: Partial<MantineTheme> = {
    fontFamily: [
        "Montserrat",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(","),
    colors: {
        primary: [
            "#F1FBE9",
            "#D8F4C3",
            "#BFED9C",
            "#A7E675",
            "#8EDE4E",
            "#75D728",
            "#5DAC20",
            "#468118",
            "#2F5610",
            "#172B08",
        ],
    },
    primaryColor: "primary",
    defaultRadius: 6,
};

export const LightTheme: Partial<MantineTheme> = {
    colorScheme: "light",
    ...commonThemeProperties,
};

export const DarkTheme: Partial<MantineTheme> = {
    colorScheme: "light",
    ...commonThemeProperties,
};
