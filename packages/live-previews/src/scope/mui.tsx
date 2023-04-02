import React from "react";
import { useRouter } from "next/router";
import qs from "qs";
import parseHtml from "html-react-parser";
import type { RefineProps } from "@refinedev/core";
import { RefineCommonScope } from "./common";
import * as RefineMui from "@refinedev/mui";
import * as MuiMaterialStyles from "@mui/material/styles";

import * as EmotionReact from "@emotion/react";
import * as EmotionStyled from "@emotion/styled";
import * as MuiLab from "@mui/lab";
import * as MuiMaterial from "@mui/material";
import * as MuiXDataGrid from "@mui/x-data-grid";
import * as ReactHookForm from "react-hook-form";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";

import {
    LightModeOutlined,
    DarkModeOutlined,
    ArrowRight,
    Camera,
    ListOutlined,
    Logout,
    ExpandLess,
    ExpandMore,
    ChevronLeft,
    ChevronRight,
    MenuRounded,
    Dashboard,
    Check,
    Close,
} from "@mui/icons-material";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

const RefineMuiDemo: React.FC<
    Partial<RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    if (initialRoutes) {
        RefineCommonScope.setInitialRoutes(initialRoutes);
    }

    return (
        <ThemeProvider theme={RefineMui.LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineMui.RefineSnackbarProvider>
                <RefineCommonScope.RefineCore.Refine
                    legacyRouterProvider={
                        RefineCommonScope.LegacyRefineReactRouterV6.default
                    }
                    dataProvider={RefineCommonScope.RefineSimpleRest.default(
                        SIMPLE_REST_API_URL,
                    )}
                    notificationProvider={RefineMui.notificationProvider}
                    Layout={RefineMui.Layout}
                    Sider={() => null}
                    catchAll={<RefineMui.ErrorComponent />}
                    options={{
                        disableTelemetry: true,
                        reactQuery: {
                            devtoolConfig: false,
                        },
                    }}
                    {...rest}
                />
            </RefineMui.RefineSnackbarProvider>
        </ThemeProvider>
    );
};

const ThemedTitle: typeof RefineMui.ThemedTitle = ({
    collapsed,
    wrapperStyles,
    text: textFromProps,
    icon: iconFromProps,
}) => {
    const [svgContent, setSvgContent] = React.useState<string | undefined>(
        undefined,
    );
    const [title, setTitle] = React.useState<string | undefined>(undefined);

    const { query, isReady } = useRouter();

    React.useEffect(() => {
        const { text, icon } = query;

        const ICON_BASE_PATH = "https://refine.new/assets/icons/";

        if (isReady && icon) {
            try {
                fetch(`${ICON_BASE_PATH}${icon}`)
                    .then((res) => res.text())
                    .then((text) => setSvgContent(text));
            } catch (error) {
                console.error(error);
            }
        }

        if (isReady && text) {
            setTitle(text as string);
        }
    }, [isReady, query]);

    return (
        <RefineMui.ThemedTitle
            collapsed={collapsed}
            wrapperStyles={wrapperStyles}
            text={title || textFromProps}
            icon={svgContent ? parseHtml(svgContent) : iconFromProps}
        />
    );
};

const RefineThemes: typeof RefineMui.RefineThemes = new Proxy(
    RefineMui.RefineThemes,
    {
        get: (target, prop) => {
            qs;
            const parsed = qs.parse(window.location.search.substring(1) ?? "");

            const themeParam = parsed.theme as string | undefined;

            if (themeParam && themeParam in target) {
                return target[
                    themeParam as keyof typeof RefineMui.RefineThemes
                ];
            }

            return (
                target[prop as keyof typeof RefineMui.RefineThemes] ??
                target.Blue
            );
        },
    },
);

const MuiScope = {
    // ...RefineCommonScope,
    RefineMuiDemo,
    RefineMui: {
        ...RefineMui,
        RefineThemes,
        ThemedTitle,
    },
    EmotionReact,
    EmotionStyled,
    MuiLab,
    MuiMaterial,
    MuiXDataGrid,
    MuiMaterialStyles,
    ReactHookForm,
    MuiIconsMaterial: {
        Close,
        Check,
        LightModeOutlined,
        DarkModeOutlined,
        ArrowRight,
        Camera,
        ListOutlined,
        Logout,
        ExpandLess,
        ExpandMore,
        ChevronLeft,
        ChevronRight,
        MenuRounded,
        Dashboard,
    },
};

export default MuiScope;
