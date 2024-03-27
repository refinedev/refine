import { ResourceProps } from "../../../contexts/resource/types";
import { pickNotDeprecated } from "../pickNotDeprecated";
import { getParentPrefixForResource } from "../router";

/**
 * generates route for the resource based on parents and custom routes
 * @deprecated this is a **legacy** function and works only with the old resource definition
 */
export const routeGenerator = (
  item: ResourceProps,
  resourcesFromProps: ResourceProps[],
): string | undefined => {
  let route;

  const parentPrefix = getParentPrefixForResource(
    item,
    resourcesFromProps,
    true,
  );

  if (parentPrefix) {
    const meta = pickNotDeprecated(item.meta, item.options);
    route = `${parentPrefix}/${meta?.route ?? item.name}`;
  } else {
    route = item.options?.route ?? item.name;
  }

  return `/${route.replace(/^\//, "")}`;
};
