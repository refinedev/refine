import React from "react";
import type { RefineProps } from "@pankod/refine-core";
import { RefineCommonScope } from "./common";
import * as RefineAntd from "@pankod/refine-antd";

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
            routerProvider={RefineCommonScope.RefineReactRouterV6.default}
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

const AntdScope = {
    // ...RefineCommonScope,
    RefineAntdDemo,
    RefineAntd,
    // RefineMuiDemo,
    // RefineMui,
    // RefineMantine,
    // RefineMantineDemo,
    // RefineChakra,
    // RefineChakraDemo,
    // // Other Packages
    // RefineReactHookForm,
    // RefineReactTable,
};

export default AntdScope;
