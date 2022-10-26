import { extendTheme } from "@chakra-ui/react";

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
        primary: {
            100: "#F1FBE9",
            200: "#D8F4C3",
            300: "#BFED9C",
            400: "#A7E675",
            500: "#8EDE4E",
            600: "#75D728",
            700: "#5DAC20",
            800: "#468118",
            900: "#2F5610",
        },
        sider: {
            background: "#2A132E",
            collapseButton: "#150A17",
        },
    },
});
