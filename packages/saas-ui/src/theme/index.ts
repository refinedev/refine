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
        },
    },
    baseTheme,
);

// const commonThemeProperties: Partial<MantineThemeOverride> = {
//     fontFamily: [
//         "Montserrat",
//         "-apple-system",
//         "BlinkMacSystemFont",
//         '"Segoe UI"',
//         "Roboto",
//         '"Helvetica Neue"',
//         "Arial",
//         "sans-serif",
//         '"Apple Color Emoji"',
//         '"Segoe UI Emoji"',
//         '"Segoe UI Symbol"',
//     ].join(","),
//     colors: {
//         primary: [
//             "#F1FBE9",
//             "#D8F4C3",
//             "#BFED9C",
//             "#A7E675",
//             "#8EDE4E",
//             "#75D728",
//             "#5DAC20",
//             "#468118",
//             "#2F5610",
//             "#172B08",
//         ],
//     },
//     black: "#626262",
//     primaryColor: "primary",
//     defaultRadius: 6,
//     headings: {
//         fontFamily: [
//             "Montserrat",
//             "-apple-system",
//             "BlinkMacSystemFont",
//             '"Segoe UI"',
//             "Roboto",
//             '"Helvetica Neue"',
//             "Arial",
//             "sans-serif",
//             '"Apple Color Emoji"',
//             '"Segoe UI Emoji"',
//             '"Segoe UI Symbol"',
//         ].join(","),
//     },
//     components: {
//         Table: {
//             styles: (theme) =>
//                 theme.colorScheme === "light"
//                     ? {
//                           root: {
//                               "thead>tr>th": {
//                                   backgroundColor: "#fafafa",
//                                   padding: "16px 4px",
//                               },
//                               "thead>tr>th:first-of-type": {
//                                   borderTopLeftRadius: theme.defaultRadius,
//                               },
//                               "thead>tr>th:last-of-type": {
//                                   borderTopRightRadius: theme.defaultRadius,
//                               },
//                               "tbody>tr>td": {
//                                   borderBottom: "1px solid #f0f0f0",
//                               },
//                           },
//                       }
//                     : { root: {} },
//         },
//     },
// };
