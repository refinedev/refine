import React from "react";
import * as RefineCore from "@pankod/refine-core";
import * as RefineReactRouterV6 from "@pankod/refine-react-router-v6";
import * as RefineSimpleRest from "@pankod/refine-simple-rest";
import * as RefineAntd from "@pankod/refine-antd";

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

const antLayoutSider: React.CSSProperties = {
    position: "relative",
};
const antLayoutSiderMobile: React.CSSProperties = {
    position: "fixed",
    height: "100vh",
    zIndex: 999,
};

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

export const Antd = {
    RefineAntdDemo,
    RefineAntd,
    RefineCore: {
        ...RefineCore,
        Refine,
    },
    RefineReactRouterV6,
    RefineSimpleRest,
    RefineDemoReactRouterV6,
};
