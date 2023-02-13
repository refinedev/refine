import { IResourceItem } from "src/interfaces/bindings/resource";
import { pickResource } from "../pick-resource";

/**
 * Picks the data provider name based on the provided name or fallbacks to resource definition, or `default`.
 */
export const pickDataProvider = (
    resourceName?: string,
    dataProviderName?: string,
    resources?: IResourceItem[],
) => {
    if (dataProviderName) {
        return dataProviderName;
    }

    /**
     * In this helper, we don't do `route` based matching therefore there's no need to check for `legacy` behaviors.
     */
    const resource = pickResource(resourceName, resources);

    if (resource?.options?.dataProviderName) {
        return resource.options.dataProviderName;
    }

    return "default";
};
