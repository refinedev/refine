import React, { FC, ComponentType, useEffect, useState } from "react";
import {
    AuthProvider,
    RefineProps,
    ResourceProps,
    AuditLogProvider,
} from "@pankod/refine-core";
import merge from "lodash/merge";

import { Cloud } from "../../components";
import { CloudContextProvider } from "../../contexts";
import { useAuthProviderWithCloudConfig, useSdk } from "../../hooks";
import { ICloudContext } from "../../interfaces";

export function withCloud(
    Refine: ComponentType<RefineProps>,
    cloudConfig: ICloudContext,
): FC<RefineProps> {
    const RefineComponent: FC<RefineProps> = ({ children, ...otherProps }) => {
        let auditLogProvider: AuditLogProvider | undefined;
        let authProvider: AuthProvider | undefined;
        const [resources, setResources] = useState<ResourceProps[]>();
        const { sdk } = useSdk();
        const { generateCloudAuthProvider } = useAuthProviderWithCloudConfig();

        if (!otherProps.authProvider) {
            authProvider = generateCloudAuthProvider();
        }

        useEffect(() => {
            if (cloudConfig.resourcesName) {
                sdk.config
                    .resources(cloudConfig.resourcesName)
                    .then((resourcesWithConfig) => {
                        setResources(
                            merge(otherProps.resources, resourcesWithConfig),
                        );
                    })
                    .catch((err) => console.error(`[refine cloud]`, err));
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
                authProvider={authProvider || otherProps.authProvider}
                auditLogProvider={
                    auditLogProvider || otherProps.auditLogProvider
                }
            >
                <Cloud />
                {children}
            </Refine>
        );
    };

    return function RefineWithCloud(props: RefineProps) {
        return (
            <CloudContextProvider {...cloudConfig}>
                <RefineComponent {...props} />
            </CloudContextProvider>
        );
    };
}
