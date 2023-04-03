import React, { FC, ComponentType, useEffect, useState } from "react";
import {
    LegacyAuthProvider,
    RefineProps,
    ResourceProps,
    AuditLogProvider,
} from "@refinedev/core";
import merge from "lodash/merge";

import { Connect } from "..";
import { ConnectContextProvider } from "../../contexts";
import { useAuthProviderWithConnectConfig, useSdk } from "../../hooks";
import { IConnectContext } from "../../interfaces";

export function withConnect(
    Refine: ComponentType<RefineProps>,
    connectConfig: IConnectContext,
): FC<RefineProps> {
    const RefineComponent: FC<RefineProps> = ({ children, ...otherProps }) => {
        let auditLogProvider: AuditLogProvider | undefined;
        let authProvider: LegacyAuthProvider | undefined;
        const [resources, setResources] = useState<ResourceProps[]>();
        const { sdk } = useSdk();
        const { generateConnectAuthProvider } =
            useAuthProviderWithConnectConfig();

        if (!otherProps.authProvider) {
            authProvider = generateConnectAuthProvider();
        }

        useEffect(() => {
            if (connectConfig.resourcesName) {
                sdk.config
                    .resources(connectConfig.resourcesName)
                    .then((resourcesWithConfig) => {
                        setResources(
                            merge(otherProps.resources, resourcesWithConfig),
                        );
                    })
                    .catch((err) => console.error(`[refine connect]`, err));
            }
        }, []);

        if (!otherProps.auditLogProvider) {
            auditLogProvider = {
                create: async ({ author, ...params }) =>
                    await sdk.log.create(params),
                get: async ({ resource, action, meta, author }) =>
                    await sdk.log.get({
                        resource,
                        action,
                        meta,
                        author,
                    }),
                update: async ({ id, name }) =>
                    sdk.log.update(id, {
                        name,
                    }),
            };
        }

        // TODO: Fix this
        // It re-render and breaks the react-query caches. Temporarily added.
        if (!resources) {
            return null;
        }

        return (
            <Refine
                {...otherProps}
                resources={resources || otherProps.resources}
                legacyAuthProvider={
                    authProvider || otherProps.legacyAuthProvider
                }
                auditLogProvider={
                    auditLogProvider || otherProps.auditLogProvider
                }
            >
                <Connect />
                {children}
            </Refine>
        );
    };

    return function RefineWithConnect(props: RefineProps) {
        return (
            <ConnectContextProvider {...connectConfig}>
                <RefineComponent {...props} />
            </ConnectContextProvider>
        );
    };
}
