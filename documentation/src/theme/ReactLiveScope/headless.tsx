import React from "react";
import * as RefineCore from "@pankod/refine-core";
import * as RefineReactRouterV6 from "@pankod/refine-react-router-v6";
import * as RefineSimpleRest from "@pankod/refine-simple-rest";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

const Refine = (props) => (
    <RefineCore.Refine
        {...props}
        options={{
            reactQuery: {
                devtoolConfig: false,
            },
        }}
    />
);

const RefineDemoReactRouterV6 = (
    initialRoutes?: string[],
): RefineCore.IRouterProvider => ({
    ...RefineReactRouterV6.default,
    RouterComponent: RefineReactRouterV6.MemoryRouterComponent.bind(null, {
        initialEntries: initialRoutes,
    }),
});

const RefineHeadlessDemo: React.FC<
    Partial<RefineCore.RefineProps> & {
        initialRoutes?: string[];
    }
> = ({ initialRoutes, ...rest }) => {
    return (
        <RefineCore.Refine
            routerProvider={RefineDemoReactRouterV6(initialRoutes)}
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

export const Core = {
    RefineCore: {
        ...RefineCore,
        Refine,
    },
    RefineReactRouterV6,
    RefineSimpleRest,
    RefineDemoReactRouterV6,
    RefineHeadlessDemo,
};
