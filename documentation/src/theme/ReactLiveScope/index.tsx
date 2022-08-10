import React from "react";
import * as RefineCore from "@pankod/refine-core";
import * as RefineReactRouterV6 from "@pankod/refine-react-router-v6";
import * as RefineAntd from "@pankod/refine-antd";
import * as RefineMui from "@pankod/refine-mui";
import * as RefineSimpleRest from "@pankod/refine-simple-rest";
import "@pankod/refine-antd/dist/antd.min.css";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

const RefineDemoReactRouterV6 = (
    initialRoutes?: string[],
): RefineCore.IRouterProvider => ({
    ...RefineReactRouterV6.default,
    RouterComponent: RefineReactRouterV6.MemoryRouterComponent.bind(null, {
        initialEntries: initialRoutes,
    }),
});

const RefineAntdDemo: React.FC<
    Partial<RefineCore.RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    return (
        <RefineCore.Refine
            routerProvider={RefineDemoReactRouterV6(initialRoutes)}
            dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
            notificationProvider={RefineAntd.notificationProvider}
            Layout={RefineAntd.Layout}
            catchAll={<RefineAntd.ErrorComponent />}
            disableTelemetry={true}
            reactQueryDevtoolConfig={false}
            {...rest}
        />
    );
};

const RefineHeadlessDemo: React.FC<
    Partial<RefineCore.RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    return (
        <RefineCore.Refine
            routerProvider={RefineDemoReactRouterV6(initialRoutes)}
            dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
            disableTelemetry={true}
            reactQueryDevtoolConfig={false}
            {...rest}
        />
    );
};

const RefineMuiDemo: React.FC<
    Partial<RefineCore.RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    return (
        <RefineMui.ThemeProvider theme={RefineMui.LightTheme}>
            <RefineMui.CssBaseline />
            <RefineMui.GlobalStyles
                styles={{ html: { WebkitFontSmoothing: "auto" } }}
            />
            <RefineMui.RefineSnackbarProvider>
                <RefineCore.Refine
                    routerProvider={RefineDemoReactRouterV6(initialRoutes)}
                    dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
                    notificationProvider={RefineMui.notificationProvider}
                    Layout={RefineMui.Layout}
                    catchAll={<RefineMui.ErrorComponent />}
                    disableTelemetry={true}
                    reactQueryDevtoolConfig={false}
                    {...rest}
                />
            </RefineMui.RefineSnackbarProvider>
        </RefineMui.ThemeProvider>
    );
};

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...React,
    RefineCore,
    RefineSimpleRest,
    RefineReactRouterV6,
    RefineAntd,
    RefineMui,
    RefineHeadlessDemo,
    RefineAntdDemo,
    RefineMuiDemo,
    RefineDemoReactRouterV6,
};
export default ReactLiveScope;
