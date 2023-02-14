import { IResourceItem } from "@contexts/resource";
import { pickNotDeprecated } from "../pickNotDeprecated";

export const pickDataProvider = (
    resourceName?: string,
    dataProviderName?: string,
    resources?: IResourceItem[],
) => {
    if (dataProviderName) {
        return dataProviderName;
    }

    const resource = resources?.find((item) => item.name === resourceName);

    const meta = pickNotDeprecated(resource?.meta, resource?.options);
    if (meta?.dataProviderName) {
        return meta.dataProviderName;
    }

    return "default";
};
