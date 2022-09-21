import { MantineThemeOverride } from "@mantine/core";

const commonThemeProperties: Partial<MantineThemeOverride> = {
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
    black: "#626262",
    primaryColor: "primary",
    defaultRadius: 6,
    headings: {
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
        fontWeight: 700,
        sizes: {
            h1: { fontSize: 34, lineHeight: 1.3, fontWeight: undefined },
            h2: { fontSize: 26, lineHeight: 1.35, fontWeight: undefined },
            h3: { fontSize: 22, lineHeight: 1.4, fontWeight: undefined },
            h4: { fontSize: 18, lineHeight: 1.45, fontWeight: undefined },
            h5: { fontSize: 16, lineHeight: 1.5, fontWeight: undefined },
            h6: { fontSize: 14, lineHeight: 1.5, fontWeight: undefined },
        },
    },
};

export const LightTheme: Partial<MantineThemeOverride> = {
    colorScheme: "light",
    ...commonThemeProperties,
};

export const DarkTheme: Partial<MantineThemeOverride> = {
    colorScheme: "dark",
    ...commonThemeProperties,
};
