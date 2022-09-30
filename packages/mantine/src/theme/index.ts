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
    },
    components: {
        Table: {
            styles: (theme) =>
                theme.colorScheme === "light"
                    ? {
                          root: {
                              "thead>tr>th": {
                                  backgroundColor: "#fafafa",
                                  padding: "16px 4px",
                              },
                              "thead>tr>th:first-of-type": {
                                  borderTopLeftRadius: theme.defaultRadius,
                              },
                              "thead>tr>th:last-of-type": {
                                  borderTopRightRadius: theme.defaultRadius,
                              },
                              "tbody>tr>td": {
                                  borderBottom: "1px solid #f0f0f0",
                              },
                          },
                      }
                    : { root: {} },
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
