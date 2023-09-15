import { TraceType } from "@refinedev/devtools-shared";
import { getTrace } from "./get-trace";

export type XRayResponse = {
    hookName: string;
    trace: TraceType[];
    resourcePath: string;
    legacyKey: boolean;
};

export function getXRay(hookName: string, legacyKey: boolean): XRayResponse {
    if (__DEV_CONDITION__ !== "development") {
        return {
            hookName: "",
            trace: [],
            resourcePath: "",
            legacyKey: false,
        };
    } else {
        const trace = getTrace().slice(1);

        const resourcePath = ""; // legacy key and hook name will be used to determine this.

        return {
            hookName,
            trace,
            resourcePath,
            legacyKey,
        };
    }
}
