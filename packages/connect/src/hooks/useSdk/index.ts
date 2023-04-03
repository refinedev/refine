import { useContext } from "react";
import { Client, createClient } from "@refinedev/sdk";

import { ConnectContext } from "../../contexts";
import { IConnectContext } from "../../interfaces";

export type UseSdkPropsType = {};

// TODO: Add hook docs
let sdk: Client;

export const useSdk = (): { sdk: Client; config: IConnectContext } => {
    const config = useContext(ConnectContext);

    if (!sdk) {
        if (config.baseUrl && config.clientId) {
            sdk = createClient({
                baseUrl: config.baseUrl,
                clientId: config.clientId,
            });
        } else {
            console.error("[refine Connect] baseUrl and clientId are required");
        }
    }

    return {
        config,
        sdk,
    };
};
