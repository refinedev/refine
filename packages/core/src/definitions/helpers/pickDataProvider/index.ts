import { IResourceItem } from "../../../contexts/resource/types";
import { pickResource } from "../pick-resource";
import { pickNotDeprecated } from "../pickNotDeprecated";

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

  const meta = pickNotDeprecated(resource?.meta, resource?.options);

  if (meta?.dataProviderName) {
    return meta.dataProviderName;
  }

  return "default";
};
