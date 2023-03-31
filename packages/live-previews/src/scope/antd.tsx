import React from "react";
import { useRouter } from "next/router";
import qs from "qs";
import parseHtml from "html-react-parser";
import type { RefineProps } from "@refinedev/core";
import { RefineCommonScope } from "./common";
import * as RefineAntd from "@refinedev/antd";
import * as AntdCore from "antd";
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
        <RefineAntd.ThemedTitle
            collapsed={collapsed}
            wrapperStyles={wrapperStyles}
            text={title || textFromProps}
            icon={svgContent ? parseHtml(svgContent) : iconFromProps}
        />
    );
};

const RefineThemes: typeof RefineAntd.RefineThemes = new Proxy(
    RefineAntd.RefineThemes,
    {
        get: (target, prop) => {
            qs;
            const parsed = qs.parse(window.location.search.substring(1) ?? "");

            const themeParam = parsed.theme as string | undefined;

            if (themeParam && themeParam in target) {
                return target[
                    themeParam as keyof typeof RefineAntd.RefineThemes
                ];
            }

            return target[prop as keyof typeof RefineAntd.RefineThemes];
        },
    },
);

const AntdScope = {
    RefineAntdDemo,
    RefineAntd: {
        ...RefineAntd,
        ThemedTitle,
        RefineThemes,
    },
    AntdCore,
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
