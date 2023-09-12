import { TraceType } from "@refinedev/devtools-shared";
import { getTrace } from "./get-trace";

export type XRayResponse = {
    hookName: string;
    trace: TraceType[];
    resourcePath: string;
    legacyKey: boolean;
};

export function getXRay(hookName: string, legacyKey: boolean): XRayResponse {
    if (process.env.NODE_ENV === "development") {
        const trace = getTrace().slice(1);

        const resourcePath = ""; // legacy key and hook name will be used to determine this.

        return {
            hookName,
            trace,
            resourcePath,
            legacyKey,
        };
    } else {
        return {
            hookName: "",
            trace: [],
            resourcePath: "",
            legacyKey: false,
        };
    }
}
