import React from "react";
import type { RefineProps } from "@pankod/refine-core";
import { RefineCommonScope } from "./common";
import * as RefineMantine from "@pankod/refine-mantine";
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
                routerProvider={RefineCommonScope.RefineReactRouterV6.default}
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

const MantineScope = {
    // ...RefineCommonScope,
    // RefineAntdDemo,
    // RefineAntd,
    // RefineMuiDemo,
    // RefineMui,
    RefineMantine,
    RefineMantineDemo,
    MantineCore,
    MantineHooks,
    MantineForm,
    MantineNotifications,
    // RefineChakra,
    // RefineChakraDemo,
    // // Other Packages
    // RefineReactHookForm,
    // RefineReactTable,
};

export default MantineScope;
