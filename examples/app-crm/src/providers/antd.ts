import type { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
    token: {
        colorPrimaryText: "rgba(0, 0, 0, 0.85)",
        colorTextSecondary: "rgba(0, 0, 0, 0.65)",
        colorTextTertiary: "rgba(0, 0, 0, 0.45)",
        colorPrimary: "#1677FF",
        colorBgContainer: "#F7F8F9",
        colorBgLayout: "#F0F2F5",
        colorBorderBg: "#E8E9EA",
        fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    },
    components: {
        Typography: {
            colorText: "rgba(0, 0, 0, 0.85)",
            colorTextDescription: "rgba(0, 0, 0, 0.65)",
            colorTextDisabled: "rgba(0, 0, 0, 0.45)",
        },
        Card: {
            colorBgContainer: "#FFFFFF",
            headerBg: "#FAFAFA",
            boxShadowTertiary:
                "0px 1px 2px 0px #00000008,0px 1px 6px -1px #000000050px,2px 4px 0px #00000005",
        },
        Table: {
            colorBgContainer: "#fff",
        },
        Input: {
            colorBgContainer: "#fff",
        },
        InputNumber: {
            colorBgContainer: "#fff",
        },
        Calendar: {
            colorBgContainer: "#FFFFFF",
        },
        Radio: {
            colorBgContainer: "#fff",
        },
        Select: {
            colorBgContainer: "#fff",
        },
    },
};
