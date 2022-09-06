import { useEffect } from "react";

import { useTelemetryData } from "@hooks/useTelemetryData";

import { ITelemetryData } from "../../interfaces/telementry";

const encode = (payload: ITelemetryData): string => {
    const stringifyedPayload = JSON.stringify(payload || {});

    if (typeof btoa !== "undefined") {
        return btoa(stringifyedPayload);
    }

    return Buffer.from(stringifyedPayload).toString("base64");
};

export const Telemetry: React.FC<{}> = () => {
    const payload = useTelemetryData();

    useEffect(() => {
        if (typeof window === "undefined" && !Image) {
            return;
        }

        const img = new Image();
        img.src = `https://telemetry.refine.dev/telemetry?payload=${encode(
            payload,
        )}`;
    }, []);

    return null;
};
