import { useContext } from "react";
import { Client } from "@pankod/refine-sdk";

import { CloudContext } from "@contexts/cloud";

export type UseSdkPropsType = {};

// TODO: Add hook docs
export const useSdk = (): Client | undefined => {
    const cloudContext = useContext(CloudContext);

    return cloudContext?.sdk;
};
