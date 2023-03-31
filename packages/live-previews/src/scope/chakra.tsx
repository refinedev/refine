import React from "react";
import { useRouter } from "next/router";
import qs from "qs";
import parseHtml from "html-react-parser";
import type { RefineProps } from "@refinedev/core";
import { RefineCommonScope } from "./common";
import * as RefineChakra from "@refinedev/chakra-ui";
import * as ChakraUI from "@chakra-ui/react";
import * as ReactHookForm from "react-hook-form";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

const RefineChakraDemo: React.FC<
    Partial<RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    if (initialRoutes) {
        RefineCommonScope.setInitialRoutes(initialRoutes);
    }

    return (
        <ChakraUI.ChakraProvider theme={RefineChakra.refineTheme}>
            <RefineCommonScope.RefineCore.Refine
                legacyRouterProvider={
                    RefineCommonScope.LegacyRefineReactRouterV6.default
                }
                dataProvider={RefineCommonScope.RefineSimpleRest.default(
                    SIMPLE_REST_API_URL,
                )}
                notificationProvider={RefineChakra.notificationProvider}
                Layout={RefineChakra.Layout}
                Sider={() => null}
                catchAll={<RefineChakra.ErrorComponent />}
                options={{
                    disableTelemetry: true,
                    reactQuery: {
                        devtoolConfig: false,
                    },
                }}
                {...rest}
            />
        </ChakraUI.ChakraProvider>
    );
};

const ThemedTitle: typeof RefineChakra.ThemedTitle = ({
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
        <RefineChakra.ThemedTitle
            collapsed={collapsed}
            wrapperStyles={wrapperStyles}
            text={title || textFromProps}
            icon={svgContent ? parseHtml(svgContent) : iconFromProps}
        />
    );
};

const RefineThemes: typeof RefineChakra.RefineThemes = new Proxy(
    RefineChakra.RefineThemes,
    {
        get: (target, prop) => {
            qs;
            const parsed = qs.parse(window.location.search.substring(1) ?? "");

            const themeParam = parsed.theme as string | undefined;

            if (themeParam && themeParam in target) {
                return target[
                    themeParam as keyof typeof RefineChakra.RefineThemes
                ];
            }

            return target[prop as keyof typeof RefineChakra.RefineThemes];
        },
    },
);

const AntdScope = {
    // ...RefineCommonScope,
    // RefineAntdDemo,
    // RefineAntd,
    // RefineMuiDemo,
    // RefineMui,
    // RefineMantine,
    // RefineMantineDemo,
    RefineChakra: {
        ...RefineChakra,
        RefineThemes,
        ThemedTitle,
    },
    RefineChakraDemo,
    ChakraUI,
    ReactHookForm,
    // // Other Packages
    // RefineReactHookForm,
    // RefineReactTable,
};

export default AntdScope;
