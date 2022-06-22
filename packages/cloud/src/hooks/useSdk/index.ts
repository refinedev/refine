import { useContext } from "react";
import { Client, createClient } from "@pankod/refine-sdk";

import { CloudContext } from "../../contexts";
import { ICloudContext } from "../../interfaces";

export type UseSdkPropsType = {};

// TODO: Add hook docs
let sdk: Client;

export const useSdk = (): { sdk: Client; config: ICloudContext } => {
    const config = useContext(CloudContext);

    if (!sdk) {
        if (config.baseUrl && config.clientId) {
            sdk = createClient({
                baseUrl: config.baseUrl,
                clientId: config.clientId,
            });
        } else {
            console.error("[refine Cloud] baseUrl and clientId are required");
        }
    }

    return {
        config,
        sdk,
    };
};
