import { extendTheme } from "@chakra-ui/react";

import { theme as baseTheme } from "@saas-ui/react";

export const refineTheme = extendTheme(
    {
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
                50: "#F1FBE9",
                100: "#D8F4C3",
                200: "#BFED9C",
                300: "#A7E675",
                400: "#8EDE4E",
                500: "#75D728",
                600: "#5DAC20",
                700: "#468118",
                800: "#2F5610",
                900: "#172B08",
            },
            sider: {
                background: "#2A132E",
                collapseButton: "#150A17",
            },
        },
        components: {
            Button: {
                defaultProps: {
                    size: "md",
                },
            },
            Sidebar: {
                variants: {
                    condensed: {
                        container: {
                            "&[data-condensed]": {
                                alignItems: "stretch",
                            },
                        },
                    },
                },
            },
            NavGroup: {
                baseStyle: {
                    title: {
                        fontSize: "md",
                        "&.saas-collapse-toggle": {
                            rounded: "none",
                        },
                    },
                },
            },
            NavItem: {
                baseStyle: {
                    link: {
                        rounded: "none",
                        fontSize: "md",
                    },
                },
            },
        },
    },
    baseTheme,
);
