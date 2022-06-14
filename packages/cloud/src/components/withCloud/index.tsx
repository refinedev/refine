import React, { FC, ComponentType } from "react";
import { AuthProvider, RefineProps } from "@pankod/refine-core";

import { Cloud } from "../../components";
import { CloudContextProvider } from "../../contexts";
import { useAuthProviderWithCloudConfig } from "../../hooks";
import { ICloudContext } from "../../interfaces";

export function withCloud(
    Refine: ComponentType<RefineProps>,
    cloudConfig: ICloudContext,
): FC<RefineProps> {
    const RefineComponent: FC<RefineProps> = ({ children, ...otherProps }) => {
        let authProvider: AuthProvider | undefined;
        const { generateCloudAuthProvider } = useAuthProviderWithCloudConfig();

        if (!otherProps.authProvider) {
            authProvider = generateCloudAuthProvider();
        }

        return (
            <Refine {...otherProps} authProvider={authProvider}>
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
