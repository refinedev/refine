import React from "react";
import { useRouter } from "next/router";
import qs from "qs";
import parseHtml from "html-react-parser";
import type { RefineProps } from "@refinedev/core";
import { RefineCommonScope } from "./common";
import * as RefineMantine from "@refinedev/mantine";
import * as MantineCore from "@mantine/core";
import * as MantineHooks from "@mantine/hooks";
import * as MantineForm from "@mantine/form";
import * as MantineNotifications from "@mantine/notifications";

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
        <RefineMantine.ThemedTitle
            collapsed={collapsed}
            wrapperStyles={wrapperStyles}
            text={title || textFromProps}
            icon={svgContent ? parseHtml(svgContent) : iconFromProps}
        />
    );
};

const RefineThemes: typeof RefineMantine.RefineThemes = new Proxy(
    RefineMantine.RefineThemes,
    {
        get: (target, prop) => {
            qs;
            const parsed = qs.parse(window.location.search.substring(1) ?? "");

            const themeParam = parsed.theme as string | undefined;

            if (themeParam && themeParam in target) {
                return target[
                    themeParam as keyof typeof RefineMantine.RefineThemes
                ];
            }

            return (
                target[prop as keyof typeof RefineMantine.RefineThemes] ??
                target.Blue
            );
        },
    },
);

const MantineScope = {
    RefineMantine: {
        ...RefineMantine,
        RefineThemes,
        ThemedTitle,
    },
    RefineMantineDemo,
    MantineCore,
    MantineHooks,
    MantineForm,
    MantineNotifications,
};

export default MantineScope;
