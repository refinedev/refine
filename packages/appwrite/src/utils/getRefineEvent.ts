import { LiveEvent } from "@refinedev/core";

export const getRefineEvent = (
    event: string,
): LiveEvent["type"] | undefined => {
    if (event.includes(".create")) {
        return "created";
    } else if (event.includes(".update")) {
    } else if (event.includes(".delete")) {
        return "deleted";
    }

    return undefined;
};
