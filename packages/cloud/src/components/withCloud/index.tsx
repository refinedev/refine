import React, { FC, ComponentType, useEffect } from "react";
import { AuthProvider, RefineProps, ResourceProps } from "@pankod/refine-core";
import merge from "lodash.merge";

import { Cloud } from "../../components";
import { CloudContextProvider } from "../../contexts";
import { useAuthProviderWithCloudConfig, useSdk } from "../../hooks";
import { ICloudContext } from "../../interfaces";

export function withCloud(
    Refine: ComponentType<RefineProps>,
    cloudConfig: ICloudContext,
): FC<RefineProps> {
    const RefineComponent: FC<RefineProps> = ({ children, ...otherProps }) => {
        let authProvider: AuthProvider | undefined;
        let resources: ResourceProps[] = otherProps.resources || [];
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
                        resources = merge(resources, resourcesWithConfig);
                    })
                    .catch((err) => console.error(`[refine cloud]`, err));
            }
        }, []);

        return (
            <Refine
                {...otherProps}
                resources={resources}
                authProvider={authProvider}
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
