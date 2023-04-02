import React from "react";
import parseHtml from "html-react-parser";
import type { RefineProps } from "@refinedev/core";
import { RefineCommonScope } from "./common";
import * as RefineAntd from "@refinedev/antd";
import * as AntdCore from "antd";
import axios from "axios";

import {
    UnorderedListOutlined,
    GoogleOutlined,
    AppstoreAddOutlined,
    LoginOutlined,
    SearchOutlined,
    default as Icon,
    DownOutlined,
    EditOutlined,
} from "@ant-design/icons";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

const RefineAntdDemo: React.FC<
    Partial<RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    if (initialRoutes) {
        RefineCommonScope.setInitialRoutes(initialRoutes);
    }

    return (
        <RefineCommonScope.RefineCore.Refine
            legacyRouterProvider={
                RefineCommonScope.LegacyRefineReactRouterV6.default
            }
            dataProvider={RefineCommonScope.RefineSimpleRest.default(
                SIMPLE_REST_API_URL,
            )}
            notificationProvider={RefineAntd.notificationProvider}
            Layout={RefineAntd.Layout}
            Sider={() => null}
            catchAll={<RefineAntd.ErrorComponent />}
            options={{
                disableTelemetry: true,
                reactQuery: {
                    devtoolConfig: false,
                },
            }}
            {...rest}
        />
    );
};

const ThemedTitle: typeof RefineAntd.ThemedTitle = ({
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
        <RefineAntd.ThemedTitle
            collapsed={collapsed}
            wrapperStyles={wrapperStyles}
            text={title || textFromProps}
            icon={svgContent ? parseHtml(svgContent) : iconFromProps}
        />
    );
};

const ConfigProvider = ({
    children,
    theme,
}: {
    children?: React.ReactNode;
    theme?: React.ComponentProps<typeof AntdCore.ConfigProvider>["theme"];
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
        <AntdCore.ConfigProvider
            theme={{
                ...(themeFromWindow
                    ? RefineAntd.RefineThemes[
                          themeFromWindow as keyof typeof RefineAntd.RefineThemes
                      ]
                    : theme),
                algorithm: theme?.algorithm,
            }}
        >
            {children}
        </AntdCore.ConfigProvider>
    );
};

const AntdScope = {
    RefineAntdDemo,
    RefineAntd: {
        ...RefineAntd,
        ThemedTitle,
    },
    AntdCore: {
        ...AntdCore,
        ConfigProvider,
    },
    AntDesignIcons: {
        UnorderedListOutlined,
        GoogleOutlined,
        AppstoreAddOutlined,
        LoginOutlined,
        SearchOutlined,
        default: Icon,
        DownOutlined,
        EditOutlined,
    },
};

export default AntdScope;
