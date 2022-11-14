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
        sider: {
            background: "#2A132E",
            collapseButton: "#150A17",
        },
    },
});
