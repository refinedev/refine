const commonLightPalette = {
    background: {
        default: "#F0F2F5",
    },
};

const commonDarkPalette = {
    background: {
        default: "#000",
    },
};

export const refineCustomColors = {
    light: {
        header: "#ffffff",
        sider: "#F7F8F9",
        siderBorder: "rgba(0, 0, 0, 0.06)",
        text: {
            primary: "#000000",
            primaryLight: "rgba(0, 0, 0, 0.85);",
            primaryDark: "rgba(0, 0, 0, 0.65)",
        },
        border: {
            authPageProviderButton: "#D9D9D9",
        },
    },
    dark: {
        header: "#1F1F1F",
        sider: "#141414",
        siderBorder: "rgba(255, 255, 255, 0.08)",
        text: {
            primary: "#ffffff",
            primaryLight: "rgba(255, 255, 255, 0.85)",
            primaryDark: "rgba(255, 255, 255, 0.65)",
        },
        border: {
            authPageProviderButton: "rgba(255, 255, 255, 0.12)",
        },
    },
} as const;

export const RefinePalettes = {
    Magenta: {
        ...commonLightPalette,
        mode: "light",
        primary: {
            main: "#EB2F96",
            light: "#EB2F96",
            dark: "#C41D7F",
            "100": "#FFF0F6",
        },
    },
    MagentaDark: {
        ...commonDarkPalette,
        mode: "dark",
        primary: {
            main: "#CB2B83",
            light: "#F37FB7",
            dark: "#E0529C",
            "100": "#291321",
        },
    },
    Blue: {
        ...commonLightPalette,
        mode: "light",
        primary: {
            main: "#1677FF",
            light: "#003EB3",
            dark: "#0958D9",
            "100": "#E6F4FF",
        },
    },
    BlueDark: {
        ...commonDarkPalette,
        mode: "dark",
        primary: {
            main: "#1677FF",
            light: "#8DC5F8",
            dark: "#0958D9",
            "100": "#111A2C",
        },
    },
    Purple: {
        ...commonLightPalette,
        mode: "light",
        primary: {
            main: "#722ED1",
            light: "#391085",
            dark: "#531DAB",
            "100": "#F9F0FF",
        },
    },
    PurpleDark: {
        ...commonDarkPalette,
        mode: "dark",
        primary: {
            main: "#722ED1",
            light: "#AB7AE0",
            dark: "#531DAB",
            "100": "#1A1325",
        },
    },
    Red: {
        ...commonLightPalette,
        mode: "light",
        primary: {
            main: "#D32029",
            light: "#F5222D",
            dark: "#CF1322",
            "100": "#FFF1F0",
        },
    },
    RedDark: {
        ...commonDarkPalette,
        mode: "dark",
        primary: {
            main: "#D32029",
            light: "#F37370",
            dark: "#E84749",
            "100": "#2A1215",
        },
    },
    Orange: {
        ...commonLightPalette,
        mode: "light",
        primary: {
            main: "#FA541C",
            light: "#FA541C",
            dark: "#D4380D",
            "100": "#FFF2E8",
        },
    },
    OrangeDark: {
        ...commonDarkPalette,
        mode: "dark",
        primary: {
            main: "#D84A1B",
            light: "#F3956A",
            dark: "#E87040",
            "100": "#2B1611",
        },
    },
    Yellow: {
        ...commonLightPalette,
        mode: "light",
        primary: {
            main: "#FAAD14",
            light: "#D48806",
            dark: "#D48806",
            "100": "#FFFBE6",
        },
    },
    YellowDark: {
        ...commonDarkPalette,
        mode: "dark",
        primary: {
            main: "#ffeb3b",
            light: "#F3CC62",
            dark: "#E8B339",
            "100": "#2B2111",
        },
    },
    Green: {
        ...commonLightPalette,
        mode: "light",
        primary: {
            main: "#52C41A",
            light: "#389E0D",
            dark: "#389E0D",
            "100": "#F6FFED",
        },
    },
    GreenDark: {
        ...commonDarkPalette,
        mode: "dark",
        primary: {
            main: "#49AA19",
            light: "#8FD460",
            dark: "#6ABE39",
            "100": "#162312",
        },
    },
} as const;
