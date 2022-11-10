import React from "react";
import type { RefineProps } from "@pankod/refine-core";
import { RefineCommonScope } from "./common";
import * as RefineMui from "@pankod/refine-mui";

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
        <RefineMui.ThemeProvider theme={RefineMui.LightTheme}>
            <RefineMui.CssBaseline />
            <RefineMui.GlobalStyles
                styles={{ html: { WebkitFontSmoothing: "auto" } }}
            />
            <RefineMui.RefineSnackbarProvider>
                <RefineCommonScope.RefineCore.Refine
                    routerProvider={
                        RefineCommonScope.RefineReactRouterV6.default
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
        </RefineMui.ThemeProvider>
    );
};

const MuiScope = {
    // ...RefineCommonScope,
    RefineMuiDemo,
    RefineMui,
    // RefineMantine,
    // RefineMantineDemo,
    // RefineChakra,
    // RefineChakraDemo,
    // // Other Packages
    // RefineReactHookForm,
    // RefineReactTable,
};

export default MuiScope;
