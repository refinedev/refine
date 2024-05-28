import {
  type DevtoolsEvent,
  type DevtoolsEventPayloads,
  type RefineHook,
  scopes,
} from "@refinedev/devtools-shared";

export type Activity =
  DevtoolsEventPayloads[DevtoolsEvent.DEVTOOLS_ACTIVITY_UPDATE]["updatedActivities"][number];

export const getResourcePath = (
  hookName: RefineHook,
  legacyKey: boolean,
): string | null => {
  if (scopes[hookName] === "auth") {
    return null;
  }
  if (hookName === "useCan") {
    if (legacyKey) {
      return "key[1].resource";
    }
    return "key[1]";
  }
  if (scopes[hookName] === "audit-log") {
    if (hookName === "useLog") {
      return "variables.resource";
    }
    return "key[1]";
  }
  if (scopes[hookName] === "data") {
    if (hookName === "useCustom" || hookName === "useCustomMutation") {
      return null;
    }
    switch (hookName) {
      case "useList":
      case "useInfiniteList":
      case "useOne":
      case "useMany":
        if (legacyKey) {
          return "key[1]";
        }
        return "key[2]";
      case "useCreate":
      case "useCreateMany":
      case "useDelete":
      case "useDeleteMany":
      case "useUpdate":
      case "useUpdateMany":
        return "variables.resource";
    }
  }
  return null;
};
