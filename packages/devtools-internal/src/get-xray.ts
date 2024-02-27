import { RefineHook, TraceType } from "@refinedev/devtools-shared";
import { getTrace } from "./get-trace";
import { getResourcePath } from "./get-resource-path";

export type XRayResponse = {
  hookName: string;
  trace: TraceType[];
  resourcePath: string | null;
  legacyKey: boolean;
};

export function getXRay(hookName: string, legacyKey: boolean): XRayResponse {
  if (__DEV_CONDITION__ !== "development") {
    return {
      hookName: "",
      trace: [],
      resourcePath: null,
      legacyKey: false,
    };
  }
  const trace = getTrace().slice(1);

  const resourcePath = getResourcePath(hookName as RefineHook, legacyKey);

  return {
    hookName,
    trace,
    resourcePath,
    legacyKey,
  };
}
