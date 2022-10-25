import { extendTheme } from "@chakra-ui/react";
import type { GlobalStyleProps } from "@chakra-ui/theme-tools";

export const LightTheme = extendTheme({
    fonts: {
        heading:
            "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        body: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    },
    styles: {
        global: (props: GlobalStyleProps) => ({
            "html, body": {
                fontSize: "14px",
                color: props.colorMode === "dark" ? "white" : "gray.700",
                lineHeight: "tall",
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
