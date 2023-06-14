import { IResourceItem } from "@contexts/resource";
import { pickResource } from "../pick-resource";

export const getResourceByName = (
    resourceName: string,
    resources: IResourceItem[],
    routerType: "legacy" | "new",
) => {
    const isLegacy = routerType === "legacy";
    const pickedResource = pickResource(resourceName, resources, isLegacy);

    if (pickedResource) return pickedResource;

    return { name: resourceName, identifier: resourceName };
};
