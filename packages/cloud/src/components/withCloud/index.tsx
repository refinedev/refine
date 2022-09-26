import React, { FC, ComponentType, useEffect, useState } from "react";
import {
    AuthProvider,
    RefineProps,
    ResourceProps,
    AuditLogProvider,
    IRouterProvider,
} from "@pankod/refine-core";
import merge from "lodash/merge";

import { Cloud, LoginPage, RegisterPage } from "../../components";
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

        // if authProvider does not exist
        if (!otherProps.authProvider) {
            authProvider = generateCloudAuthProvider();
        }

        // if authPages (login, register, etc) does not exist
        let Login: React.FC<{}> | undefined;
        let routerProvider: IRouterProvider | undefined;
        if (!otherProps.LoginPage) {
            Login = LoginPage;

            // routerProvider
            routerProvider = {
                ...otherProps.routerProvider,
                routes: [
                    ...(otherProps.routerProvider.routes || []),
                    {
                        element: <RegisterPage />,
                        path: "/register",
                    },
                ],
            };
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
                routerProvider={routerProvider || otherProps.routerProvider}
                resources={resources || otherProps.resources}
                authProvider={authProvider || otherProps.authProvider}
                LoginPage={Login || otherProps.LoginPage}
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
