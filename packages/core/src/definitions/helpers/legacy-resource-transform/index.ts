import type {
  IResourceItem,
  ResourceProps,
} from "../../../contexts/resource/types";
import { routeGenerator } from "../routeGenerator";

/**
 * For the legacy definition of resources, we did a basic transformation for provided resources
 * - This is meant to provide an easier way to access properties.
 * - In the new definition, we don't need to do transformations and properties can be accessed via helpers or manually.
 * This is kept for backward compability
 */
export const legacyResourceTransform = (resources: ResourceProps[]) => {
  const _resources: IResourceItem[] = [];

  resources.forEach((resource) => {
    _resources.push({
      ...resource,
      label: resource.meta?.label ?? resource.options?.label,
      route: routeGenerator(resource, resources),
      canCreate: !!resource.create,
      canEdit: !!resource.edit,
      canShow: !!resource.show,
      canDelete: resource.canDelete,
    });
  });

  return _resources;
};
