import { IResourceItem } from "@contexts/resource";

export const pickDataProvider = (
    resourceName?: string,
    dataProviderName?: string,
    resources?: IResourceItem[],
) => {
    if (dataProviderName) {
        return dataProviderName;
    }

    const resource = resources?.find((item) => item.name === resourceName);

    if (resource?.options?.dataProviderName) {
        return resource.options.dataProviderName;
    }

    return "default";
};
