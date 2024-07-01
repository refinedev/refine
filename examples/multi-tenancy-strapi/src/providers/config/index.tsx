import { useTenant } from "@/providers/tenant";
import { ConfigProvider as AntdConfigProvider, type ThemeConfig } from "antd";
import { ThemeProvider as AntdStyleThemeProvider } from "antd-style";
import type { PropsWithChildren } from "react";

import "@refinedev/antd/dist/reset.css";
import { RefineThemes } from "@refinedev/antd";

type Props = {
  theme?: ThemeConfig;
};

export const ConfigProvider = ({
  children,
  theme: themeFromProps,
}: PropsWithChildren<Props>) => {
  const { tenant } = useTenant();

  const theme: ThemeConfig = {
    ...themeFromProps,
    components: {
      Layout: {
        bodyBg: "white",
      },
      ...themeFromProps?.components,
    },
    token: {
      fontFamily: "Poppins",
      colorPrimary:
        tenant?.primaryColor || RefineThemes.Blue?.token?.colorPrimary,
      ...themeFromProps?.token,
    },
    cssVar: true,
  };

  return (
    <AntdConfigProvider theme={theme}>
      <AntdStyleThemeProvider theme={theme}>{children}</AntdStyleThemeProvider>
    </AntdConfigProvider>
  );
};
