import React from "react";
import parseHtml from "html-react-parser";
import type { RefineProps } from "@refinedev/core";
import { RefineCommonScope } from "./common";
import * as RefineMantine from "@refinedev/mantine";
import * as MantineCore from "@mantine/core";
import * as MantineHooks from "@mantine/hooks";
import * as MantineForm from "@mantine/form";
import * as MantineNotifications from "@mantine/notifications";
import axios from "axios";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

const RefineMantineDemo: React.FC<
    Partial<RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    if (initialRoutes) {
        RefineCommonScope.setInitialRoutes(initialRoutes);
    }

    return (
        <MantineCore.MantineProvider
            theme={RefineMantine.LightTheme}
            withNormalizeCSS
            withGlobalStyles
        >
            <MantineCore.Global
                styles={{ body: { WebkitFontSmoothing: "auto" } }}
            />
            <RefineCommonScope.RefineCore.Refine
                legacyRouterProvider={
                    RefineCommonScope.LegacyRefineReactRouterV6.default
                }
                dataProvider={RefineCommonScope.RefineSimpleRest.default(
                    SIMPLE_REST_API_URL,
                )}
                notificationProvider={RefineMantine.notificationProvider}
                Layout={RefineMantine.Layout}
                Sider={() => null}
                catchAll={<RefineMantine.ErrorComponent />}
                options={{
                    disableTelemetry: true,
                    reactQuery: {
                        devtoolConfig: false,
                    },
                }}
                {...rest}
            />
        </MantineCore.MantineProvider>
    );
};

const ThemedTitle: typeof RefineMantine.ThemedTitle = ({
    collapsed,
    wrapperStyles,
    text: textFromProps,
    icon: iconFromProps,
}) => {
    const [svgContent, setSvgContent] = React.useState<string | undefined>(
        window.__refineIconSVGContent || undefined,
    );
    const [title, setTitle] = React.useState<string | undefined>(
        window.__refineTitleContent || undefined,
    );

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const messageListener = (event: MessageEvent) => {
                if (event.data.type === "UPDATE_DYNAMIC_VALUES") {
                    if (event.data.payload?.title) {
                        setTitle(event.data.payload?.title);

                        if (typeof window !== "undefined") {
                            window.__refineTitleContent =
                                event.data.payload?.title;
                        }
                    }

                    if (event.data.payload?.icon) {
                        try {
                            axios
                                .get(`/assets/icons/${event.data.payload.icon}`)
                                .then((res) => {
                                    const content = res.data
                                        .replace(
                                            /fill\=\"white\"/g,
                                            `fill="currentColor"`,
                                        )
                                        .replace(
                                            /stroke\=\"white\"/g,
                                            `stroke="currentColor"`,
                                        );

                                    setSvgContent(content);

                                    if (typeof window !== "undefined") {
                                        window.__refineIconSVGContent = content;
                                    }
                                });
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            };

            window.addEventListener("message", messageListener);

            return () => {
                window.removeEventListener("message", messageListener);
            };
        }

        return () => undefined;
    }, []);

    return (
        <RefineMantine.ThemedTitle
            collapsed={collapsed}
            wrapperStyles={wrapperStyles}
            text={title || textFromProps}
            icon={svgContent ? parseHtml(svgContent) : iconFromProps}
        />
    );
};

const MantineProvider = ({
    children,
    theme,
    ...restProps
}: {
    children?: React.ReactNode;
    theme?: { colorScheme?: string };
}) => {
    const [themeFromWindow, setThemeFromWindow] = React.useState<
        undefined | string
    >(undefined);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const messageListener = (event: MessageEvent) => {
                if (event.data.type === "UPDATE_DYNAMIC_VALUES") {
                    if (event.data.payload.theme) {
                        setThemeFromWindow(event.data.payload.theme);
                    }
                }
            };

            window.addEventListener("message", messageListener);

            return () => {
                window.removeEventListener("message", messageListener);
            };
        }

        return () => undefined;
    }, []);

    return (
        <MantineCore.MantineProvider
            {...restProps}
            theme={{
                ...(themeFromWindow &&
                themeFromWindow in RefineMantine.RefineThemes
                    ? RefineMantine.RefineThemes[
                          themeFromWindow as keyof typeof RefineMantine.RefineThemes
                      ]
                    : theme),
                colorScheme: theme?.colorScheme as any,
            }}
        >
            {children}
        </MantineCore.MantineProvider>
    );
};

const MantineScope = {
    RefineMantine: {
        ...RefineMantine,
        ThemedTitle,
    },
    RefineMantineDemo,
    MantineCore: {
        ...MantineCore,
        MantineProvider,
    },
    MantineHooks,
    MantineForm,
    MantineNotifications,
};

export default MantineScope;
