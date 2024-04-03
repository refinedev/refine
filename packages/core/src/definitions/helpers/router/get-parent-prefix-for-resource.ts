import { ResourceProps } from "../../../contexts/resource/types";
import { getParentResource } from "./get-parent-resource";
import { removeLeadingTrailingSlashes } from "./remove-leading-trailing-slashes";

/**
 * Returns the parent prefix for a resource
 * - If `legacy` is provided, the computation is based on the `route` option of the resource
 */
export const getParentPrefixForResource = (
  resource: ResourceProps,
  resources: ResourceProps[],
  /**
   * Uses legacy route if true (`options.route`)
   */
  legacy?: boolean,
): string | undefined => {
  const parents: ResourceProps[] = [];

  let parent = getParentResource(resource, resources);

  while (parent) {
    parents.push(parent);
    parent = getParentResource(parent, resources);
  }

  if (parents.length === 0) {
    return undefined;
  }

  return `/${parents
    .reverse()
    .map((parent) => {
      const v = legacy ? parent.options?.route ?? parent.name : parent.name;
      return removeLeadingTrailingSlashes(v);
    })
    .join("/")}`;
};
