import type { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
    token: {
        colorPrimary: "#1677FF",
        colorBgContainer: "#F7F8F9",
        colorBgLayout: "#F0F2F5",
        colorBorderBg: "#E8E9EA",
    },
    components: {
        Card: {
            colorBgContainer: "#FFFFFF",
            headerBg: "#FAFAFA",
            boxShadowTertiary:
                "0px 1px 2px 0px #00000008,0px 1px 6px -1px #000000050px,2px 4px 0px #00000005",
        },
    },
};
