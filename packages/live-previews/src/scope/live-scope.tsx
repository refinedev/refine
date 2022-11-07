import React from "react";
import * as RefineCore from "@pankod/refine-core";
import { MemoryRouterComponent } from "@pankod/refine-react-router-v6";
import * as RefineReactRouterV6Base from "@pankod/refine-react-router-v6";
import * as RefineSimpleRest from "@pankod/refine-simple-rest";
import * as RefineAntd from "@pankod/refine-antd";
import * as RefineMui from "@pankod/refine-mui";
import * as RefineMantine from "@pankod/refine-mantine";
import * as RefineChakra from "@pankod/refine-chakra-ui";
import * as RefineReactHookForm from "@pankod/refine-react-hook-form";
import * as RefineReactTable from "@pankod/refine-react-table";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

declare global {
    interface Window {
        routerSettings?: { initialEntries?: string[] };
        refineProps?: Partial<React.ComponentProps<typeof RefineCore.Refine>>;
    }
}

const Refine = (
    props: React.ComponentProps<typeof RefineCore.Refine>,
): JSX.Element => {
    const { options: hiddenRefineOptions, ...hiddenRefineProps } =
        window.refineProps ?? {};
    return (
        <RefineCore.Refine
            {...props}
            options={{
                disableTelemetry: true,
                ...(props?.options || {}),
                ...(hiddenRefineOptions || {}),
                reactQuery: {
                    devtoolConfig: false,
                    ...(props?.options?.reactQuery || {}),
                    ...(hiddenRefineOptions?.reactQuery || {}),
                },
            }}
            {...hiddenRefineProps}
        />
    );
};

const setInitialRoutes = (initialEntries: string[]): void => {
    if (typeof window !== "undefined") {
        window.routerSettings = {
            initialEntries,
        };
    }
};

const setRefineProps = (
    props: Partial<React.ComponentProps<typeof RefineCore.Refine>>,
) => {
    if (typeof window !== "undefined") {
        window.refineProps = props;
    }
};

const DemoMemoryRouterComponent = (
    props: React.ComponentProps<typeof MemoryRouterComponent>,
): JSX.Element => {
    return (
        <MemoryRouterComponent
            {...props}
            {...(typeof window !== "undefined" ? window.routerSettings : {})}
        />
    );
};

const RefineReactRouterV6 = {
    ...RefineReactRouterV6Base,
    MemoryRouterComponent: DemoMemoryRouterComponent,
    default: {
        ...RefineReactRouterV6Base.default,
        RouterComponent: DemoMemoryRouterComponent,
    },
};

/**
 * @deprecated please use `setInitialRoutes` instead
 */
const RefineDemoReactRouterV6 = (
    initialRoutes?: string[],
): RefineCore.IRouterProvider => {
    if (initialRoutes) {
        setInitialRoutes(initialRoutes);
    }

    return RefineReactRouterV6.default;
};

const RefineAntdDemo: React.FC<
    Partial<RefineCore.RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    if (initialRoutes) {
        setInitialRoutes(initialRoutes);
    }

    return (
        <Refine
            routerProvider={RefineReactRouterV6.default}
            dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
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

const RefineHeadlessDemo: React.FC<
    Partial<RefineCore.RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    if (initialRoutes) {
        setInitialRoutes(initialRoutes);
    }

    return (
        <Refine
            routerProvider={RefineReactRouterV6.default}
            dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
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

const RefineMuiDemo: React.FC<
    Partial<RefineCore.RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    if (initialRoutes) {
        setInitialRoutes(initialRoutes);
    }

    return (
        <RefineMui.ThemeProvider theme={RefineMui.LightTheme}>
            <RefineMui.CssBaseline />
            <RefineMui.GlobalStyles
                styles={{ html: { WebkitFontSmoothing: "auto" } }}
            />
            <RefineMui.RefineSnackbarProvider>
                <Refine
                    routerProvider={RefineReactRouterV6.default}
                    dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
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
        </RefineMui.ThemeProvider>
    );
};

const RefineMantineDemo: React.FC<
    Partial<RefineCore.RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    if (initialRoutes) {
        setInitialRoutes(initialRoutes);
    }

    return (
        <RefineMantine.MantineProvider
            theme={RefineMantine.LightTheme}
            withNormalizeCSS
            withGlobalStyles
        >
            <RefineMantine.Global
                styles={{ body: { WebkitFontSmoothing: "auto" } }}
            />
            <Refine
                routerProvider={RefineReactRouterV6.default}
                dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
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
        </RefineMantine.MantineProvider>
    );
};

const RefineChakraDemo: React.FC<
    Partial<RefineCore.RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    if (initialRoutes) {
        setInitialRoutes(initialRoutes);
    }

    return (
        <RefineChakra.ChakraProvider theme={RefineChakra.refineTheme}>
            <Refine
                routerProvider={RefineReactRouterV6.default}
                dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
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
        </RefineChakra.ChakraProvider>
    );
};

export const packageMap: Record<string, string> = {
    "@pankod/refine-core": "RefineCore",
    "@pankod/refine-react-router-v6": "RefineReactRouterV6",
    "@pankod/refine-antd": "RefineAntd",
    "@pankod/refine-mui": "RefineMui",
    "@pankod/refine-mantine": "RefineMantine",
    "@pankod/refine-chakra-ui": "RefineChakra",
    "@pankod/refine-simple-rest": "RefineSimpleRest",
    "@pankod/refine-react-hook-form": "RefineReactHookForm",
    "@pankod/refine-react-table": "RefineReactTable",
};

export const RefineScope = {
    // React
    React,
    ...React,
    // Core
    RefineCore: {
        ...RefineCore,
        Refine,
    },
    // Data
    RefineSimpleRest,
    // Utilities
    setInitialRoutes,
    setRefineProps,
    RefineReactRouterV6,
    RefineDemoReactRouterV6,
    // UI
    RefineHeadlessDemo,
    RefineAntdDemo,
    RefineAntd,
    RefineMuiDemo,
    RefineMui,
    RefineMantine,
    RefineMantineDemo,
    RefineChakra,
    RefineChakraDemo,
    // Other Packages
    RefineReactHookForm,
    RefineReactTable,
};
