import React from "react";
import type { RefineProps } from "@pankod/refine-core";
import { RefineCommonScope } from "./common";
import * as RefineChakra from "@pankod/refine-chakra-ui";

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
        <RefineChakra.ChakraProvider theme={RefineChakra.refineTheme}>
            <RefineCommonScope.RefineCore.Refine
                routerProvider={RefineCommonScope.RefineReactRouterV6.default}
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
        </RefineChakra.ChakraProvider>
    );
};

const AntdScope = {
    // ...RefineCommonScope,
    // RefineAntdDemo,
    // RefineAntd,
    // RefineMuiDemo,
    // RefineMui,
    // RefineMantine,
    // RefineMantineDemo,
    RefineChakra,
    RefineChakraDemo,
    // // Other Packages
    // RefineReactHookForm,
    // RefineReactTable,
};

export default AntdScope;
